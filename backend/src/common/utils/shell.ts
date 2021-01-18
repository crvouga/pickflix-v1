import { ChildProcess } from "child_process";

export const promiseFromChildProcess = (child: ChildProcess) => {
  return new Promise(function (resolve, reject) {
    child.addListener("error", reject);
    child.addListener("exit", resolve);
  });
};
