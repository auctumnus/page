/**
 *  ================= Clock code =================
 */

/**
 * Loads an image.
 */
const loadImage = (name) => new Promise((resolve, reject) => {
  const img = new Image()
  img.addEventListener('load', () => resolve(img), false)
  img.src = `${window.origin}/assets/static/applogos/${name}.png`
})

/**
 * Tests if the current locale uses 24 hour time.
 * Thanks to stackoverflow lmao
 */
localeUses24HourTime = () =>
  new Intl.DateTimeFormat(navigator.language, { hour: 'numeric' })
    .formatToParts(new Date(2020, 0, 1, 13))
    .find(part => part.type === 'hour').value.length === 2


const canvas = document.getElementById('clock_canvas')
const ctx = canvas.getContext('2d')

let drawArbitrary = () => {}

// iife for async
;(async () => {
  // images for the canvas
  const files = ['day', 'weekday', 'months', 'led', 'clock_base']
  const images = await Promise.all(files.map(loadImage))
  const [days, weekdays, months, led, clockBase] = images

  const drawBase = () => ctx.drawImage(clockBase, 0, 0)

  /**
   * Draws the month name.
   * @param {number} month The number of the month to draw.
   */
  const drawMonth = (month) => 
    ctx.drawImage(
      // source image
      months,
      // source coords
      0,  month * 6, 22, 6,
      // destination coords
      20, 48,        22, 6
    )

  /**
   * Draws the weekday.
   * @param {number} weekday The day of the week to draw.
   */
  const drawWeekday = (weekday) =>
    ctx.drawImage(
      weekdays,
      0, weekday * 6, 20, 6,
      22, 23, 20, 6
    )

  /**
   * Draws the day of the month.
   * @param {number} date The day of the month, from 0 to 30.
   */
  const drawDate = (date) => {
    if(date > 10) {
      // e.g. 25 -> 2
      const tens = Math.floor(date / 10)
      // e.g. 25 -> 5
      const ones = date % 10

      // draw!
      // tens
      ctx.drawImage(
        days,
        8 * tens, 0, 8, 13,
        22, 32, 8, 13
      )
      // ones
      ctx.drawImage(
        days,
        8 * ones, 0, 8, 13,
        31, 32, 8, 13
      )
    } else {
      ctx.drawImage(
        days,
        8 * date, 0, 8, 13,
        date === 1 ? 28 : 27, 32,8, 13
      )
    }
  }

  const drawSep = (offset=0) => {
    // separator
    ctx.drawImage(
      led,
      90, 0, 3, 11,
      28 + offset, 6, 3, 11
    )
  }

  const drawMinutes = (minute, offset=0) => {
    // minute
    const minuteTens = Math.floor(minute / 10)
    const minuteOnes = minute % 10
    ctx.drawImage(
      led,
      9 * minuteTens, 0, 9, 11,
      31 + offset, 6, 9, 11
    )
    ctx.drawImage(
      led,
      9 * minuteOnes, 0, 9, 11,
      40 + offset, 6, 9, 11
    )
  }

  const draw12Hour = (hour, minute) => {
    const offset = -6
    const afternoon = hour > 12
    hour = (hour % 12) || 12
    const hourOnes = hour % 10

    if(hour > 9) {
      ctx.drawImage(
        led,
        13, 0, 4, 11,
        8, 6, 4, 11
      )
    }

    ctx.drawImage(
      led,
      9 * hourOnes, 0, 9, 11,
      13, 6, 9, 11
    )

    drawSep(offset)
    drawMinutes(minute, offset)
    // suffix
    const suffix = afternoon ? 106 : 94
    ctx.drawImage(
      led,
      suffix, 0, 12, 11,
      44, 4, 12, 11
    )
  }

  const draw24Hour = (hour, minute) => {
    const hourTens = Math.floor(hour / 10)
    const hourOnes = hour % 10
    if(hourTens || fullHour) {
      ctx.drawImage(
        led,
        9 * hourTens, 0, 9, 11,
        10 + offset, 6, 9, 11
      )
    }
    ctx.drawImage(
      led,
      9 * hourOnes, 0, 9, 11,
      19 + offset, 6, 9, 11
    )
    drawSep()
    drawMinutes(minute)
  }

  const updateClock = (now) => {
    now = now || new Date()
    // time
    const hour = now.getHours()
    const minute = now.getMinutes()
    // date
    const day = now.getDate()
    const weekday = now.getDay()
    const month = now.getMonth()

    drawBase()
    drawMonth(month)
    drawWeekday(weekday)
    drawDate(day)
    if(localeUses24HourTime()) {
      draw24Hour(hour, minute)
    } else {
      draw12Hour(hour, minute)
    }
  }

  console.log('starting clock')

  updateClock(new Date())
  global.drawArbitrary = updateClock
  setInterval(updateClock, 1000 * 60)
})()
