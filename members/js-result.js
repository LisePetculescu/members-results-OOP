function construct(resultData) {
  const ResultObject = {
    date: new Date(resultData.date),
    memberId: resultData.memberId,
    _discipline: resultData.discipline,
    _type: resultData.resultType,
    _time: resultData.time,
    get time() {
      const [minutes, seconds, centiseconds] = this._time.split(/[:.]/);

      // console.log(minutes);
      // console.log(seconds);
      // console.log(centiseconds);

      // const newTime = minutes * 60 * 1000 + seconds * 1000 + centiseconds * 10;
      // console.log(newTime);
      return minutes * 60 * 1000 + seconds * 1000 + centiseconds * 10;
    },
    get type() {
      return this._type === "competition" ? "Stævne" : "Træning";
    },
    get discipline() {
      if (this._discipline === "backstroke") {
        return "Ryg";
      } else if (this._discipline === "breaststroke") {
        return "Bryst";
      } else if (this._discipline === "butterfly") {
        return "Butterfly";
      } else if (this._discipline === "freestyle") {
        return "Freestyle";
      } else {
        return this._discipline;
      }
    },
  };
  // console.log(resultData.time);
  // console.log(ResultObject);
  return ResultObject;
}

export { construct };
