export function capitalize(string: string) {
  string = string.toLocaleLowerCase();
  const s = string.includes("/") ? "/" : " ";
  var arr = string.split(s);
  arr = arr.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  return arr.join(s);
}

export const makeCancelable = (promise: Promise<any> | any) => {
  let hasCanceled_ = false;
  if (!!!promise) return null;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then((val: any) =>
      hasCanceled_ ? reject({ isCanceled: true }) : resolve(val)
    );
    promise.catch((error: any) =>
      hasCanceled_ ? reject({ isCanceled: true }) : reject(error)
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled_ = true;
    },
  };
};
