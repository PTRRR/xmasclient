import * as extentions from './extentions'

export function gcodeExtentionForP5 (p5) {
  // Extend P5
  for (const [key, extention] of Object.entries(extentions)) {
    try {
      extention(p5)
      console.log(`P5 extentions: ${key} OK`)
    } catch (e) {
      console.error(e)
    }
  }
}
