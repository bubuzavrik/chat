export default function hocCompose (hocOne, ...hocOther) {
  return Component => {
    if (hocOther.length) {
      return hocCompose(...hocOther)(hocOne(Component))
    } else if (hocOne instanceof Function) {
      return hocOne(Component)
    }

    return Component
  }
}
