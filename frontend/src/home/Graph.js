import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import R from "ramda";
import React, { useEffect } from "react";
import Graph from "react-graph-vis";
import { useLocation } from "react-router";
import useLocalStorage from "../hooks/usePersistentState";
import { TMDB } from "../services";

const useStyles = makeStyles(theme => ({
  root: {}
}));

const options = {
  layout: {
    hierarchical: {
      enabled: false
    }
  },
  edges: {
    color: "#fff"
  },
  nodes: {
    font: {
      color: "#fff"
    }
  },
  height: "500px",
  groups: {
    movie: {
      radius: "10px"
    },
    person: {
      radius: "5px"
    }
  }
};

const personToNode = person => ({
  id: person.id,
  image: `${TMDB.assetURL}${person.profilePath}`,
  label: person.name,
  shape: "image",
  group: "person",
  size: 50
});

const movieToNode = movie => ({
  id: movie.id,
  image: `${TMDB.assetURL}${movie.posterPath}`,
  label: movie.title,
  shape: "image",
  group: "movie",
  size: 100
});

const nodesToEdge = (movie, person) => ({
  from: person.id,
  to: movie.id,
  length: 400
});

const movieToTopFivePeople = movie => R.take(5, movie.cast);

const movieToGraph = movie => {
  const movieNodes = R.map(movieToNode, [movie]);
  const personNodes = R.map(personToNode, movieToTopFivePeople(movie));
  const nodes = R.union(movieNodes, personNodes);

  const edges = R.lift(nodesToEdge)(movieNodes, personNodes);

  return {
    nodes,
    edges
  };
};

const personToTopFiveMovies = person =>
  R.take(5, R.concat(person.cast, person.crew));

const personToGraph = person => {
  const movieNodes = R.map(movieToNode, personToTopFiveMovies(person));
  const personNodes = R.map(personToNode, [person]);
  const nodes = [...movieNodes, ...personNodes];

  const edges = R.lift(nodesToEdge)(movieNodes, personNodes);

  return {
    nodes,
    edges
  };
};

const loadGraph = async (entity, id) => {
  const [details, credits] = await Promise.all([
    TMDB.get(`/${entity}/${id}`),
    TMDB.get(`/${entity}/${id}/credits`)
  ]);
  const entityData = {
    ...details,
    ...credits
  };

  return entity === "movie"
    ? movieToGraph(entityData)
    : personToGraph(entityData);
};

const mergeGraphs = R.curry((g1, g2) => {
  const nodes = R.unionWith(R.eqProps("id"), g1.nodes, g2.nodes);
  const edges = R.union(g1.edges, g2.edges);
  return {
    nodes,
    edges
  };
});

const MovieGraph = props => {
  const [graph, setGraph] = useLocalStorage("graph", {
    nodes: [],
    edges: []
  });

  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      const {
        state: { entity, id }
      } = location;

      loadGraph(entity, id).then(g => setGraph(mergeGraphs(g)));
    }
  }, []);

  const events = {
    selectNode: event => {
      const { nodes } = event;
      const id = R.head(nodes);
      const node = R.find(R.propEq("id", id), graph.nodes);
      loadGraph(node.group, id).then(g => setGraph(mergeGraphs(g)));
    }
  };

  return (
    <div>
      <AppBar position="sticky" color="default">
        <Toolbar>
          <Typography style={{ flexGrow: 1 }} variant="h6">
            Movie Map
          </Typography>
        </Toolbar>
      </AppBar>
      <Graph
        style={{ outline: "none" }}
        graph={graph}
        options={options}
        events={events}
      />
      <Button onClick={() => setGraph({ nodes: [], edges: [] })}>Clear</Button>
    </div>
  );
};

export default MovieGraph;
