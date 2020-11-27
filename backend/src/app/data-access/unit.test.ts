import { makeUserFake } from "../../users/models";
import { UserRepositoryHashMap } from "../../users/repositories/user-repository";
import { GenericRepositoryHashMap } from "./generic-repository.hash-map";

describe("hash map respository", () => {
  it("searches entities by keys", async () => {
    const repository = new GenericRepositoryHashMap<{
      id: string;
      word: string;
    }>({});
    const words = ["hi", "hey", "hello", "sup", "yo"];

    for (let i = 0; i < words.length; i++) {
      await repository.add([{ id: String(i), word: words[i] }]);
    }

    const query1 = "h";
    const results1 = await repository.search(query1, ["word"]);
    expect(results1).toHaveLength(3);
    for (const result of results1) {
      expect(result.word).toContainEqual(query1);
    }

    const query2 = "y";
    const results2 = await repository.search(query2, ["word"]);
    expect(results2).toHaveLength(2);
    for (const result of results2) {
      expect(result.word).toContainEqual(query2);
    }
    const query3 = "z";
    const results3 = await repository.search(query3, ["word"]);
    expect(results3).toHaveLength(0);
  });
});
