export function formatCastingTime(ct) {
  try {
    const match = ct.match(/(\d+) ([^,\s]{1,9})/);
    const value = match[1];
    const unit = formatCTUnit(match[2]);
    return value + unit;
  } catch (e) {
    console.error(ct, e);
    return "";
  }
}

function formatCTUnit(unit) {
  try {
    if (unit.startsWith("minuto")) return "'";
    if (unit.startsWith("hora")) return "h";
    if (unit === "ação") return " a";
    if (unit === "ação bônus") return " ab";
    if (unit === "reação") return " r";
    return unit;
  } catch (e) {
    console.error(unit, e);
    return "";
  }
}

export function formatRange(r) {
  try {
    if (r.includes("metro") || r.includes("quilômetro")) {
      const match = r.match(/([\d,]+) ([^,\s]{1,15})/);
      const value = match[1];
      const unit = formatRUnit(match[2]);
      return value + unit;
    }
    if (r.startsWith("Pessoal")) return " P";
    if (r.startsWith("Toque")) return "0";
    return r;
  } catch (e) {
    console.error(r, e);
    return "";
  }
}

function formatRUnit(unit) {
  try {
    if (unit.startsWith("metro")) return "m";
    if (unit.startsWith("quilômetro")) return "km";
    if (unit === "Toque") return "";
    if (unit === "ação bônus") return " ab";
    if (unit === "reação") return " r";
    return unit;
  } catch (e) {
    console.error(unit, e);
    return "";
  }
}

export function formatDuration(d) {
  try {
    if (d === "Instantânea") return "I";
    if (d === "Até ser dissipada") return "D";
    if (d === "Especial") return "E";
    if (d.startsWith("Concentração")) return "C";
    if (d === "Até ser dissipada ou ativada") return "D/A";
    const match = d.match(/(\d+) ([^,\s]{1,9})/);
    const value = match[1];
    const unit = formatDUnit(match[2]);
    return value + unit;
  } catch (e) {
    console.error(d, e);
    return "";
  }
}

function formatDUnit(unit) {
  try {
    if (unit.startsWith("minuto")) return "'";
    if (unit.startsWith("hora")) return "h";
    if (unit.startsWith("dia")) return " d";
    if (unit.startsWith("rodada")) return " r";
    return unit;
  } catch (e) {
    console.error(unit, e);
    return "";
  }
}

export const trackScrolling = (dispatch, action, elemId) => () => {
  const wrappedElement = document.getElementById(elemId);
  if (isBottom(wrappedElement)) {
    dispatch(action);
  }
  function isBottom(el) {
    return el.getBoundingClientRect().bottom <= window.innerHeight + 100;
  }
};

export const makeCancelable = (promise) => {
  let hasCanceled_ = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then((val) =>
      hasCanceled_ ? reject({ isCanceled: true }) : resolve(val)
    );
    promise.catch((error) =>
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
