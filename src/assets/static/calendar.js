const sequence = (length, start = 0) => 
    Array.from({length}, (_, i) => i + (start || 0))

const h = (tag, attrs, ...children) => {
    const el = document.createElement(tag)
    if(attrs) {
        Object.entries(attrs).forEach(([key, value]) => {
            el.setAttribute(key, value)
        })
    }
    children.forEach((child) => {
        if(typeof child === 'string') {
            el.appendChild(document.createTextNode(child))
        } else {
            el.appendChild(child)
        }
    })
    return el
}

const MONTH_NAMES = [
    'Massaigh',
    'Aisser',
    'Baimither',
    'Tocha',
    'Sacha',
    'Taime',
    'Giulan',
    'Uinte',
    'Cubhaigh',
    'Bomaigh',
]

const CYCLE_NAMES = [
    'Sar',
    'Ammair',
    'Tubh'
]

const DAY_NAMES = [
    'Crisscen',
    'Boidhersscen',
    'Irnersscen',
    'Dairgesscen',
    'Uistisscen',
    'Oigesscen',
    'Fraighnichen',
    'Muirnichen',
    'Descichen',
    'Soinichen',
]

const DAY_NAME_ABBREVIATIONS = [
    'Crs',
    'Bdr',
    'Irs',
    'Drg',
    'Uss',
    'Ogs',
    'Frg',
    'Mrg',
    'Dsc',
    'Sns',
]

const getYearCycle = (year) => {
    return CYCLE_NAMES[year % 3]
}

const daysInMonth = (month, year) => {
    if (month === 9) { // Bomaigh
        if (year % 600 === 0) {
            return 28
        } else if ((year % 3 === 0) || (year % 200 === 0)) {
            return 29
        } else {
            return 30
        }
    } else if(month % 2 === 1) {
        return 29
    } else {
        return 30
    }
}

const firstDayOfYear = (year) => {
    let daysSinceStart = (year - 1) * 295.665
    if(year > 2677) {
        daysSinceStart -= 13
    }

    return Math.floor(daysSinceStart % DAY_NAMES.length)
}

const firstDayOfMonth = (month, year) => {
    const daysSinceStart = sequence(month).map((m) => daysInMonth(m, year)).reduce((a, b) => a + b, 0)
    return (firstDayOfYear(year) + daysSinceStart) % DAY_NAMES.length
}

const makeMonth = (month, year, includeHeader) => {
    const table = h('table', { class: 'month' })

    const header = h(
        'thead', 
        {} , 
        includeHeader ? h('tr', { }, h('th', {colspan: 10, class: 'month-name'}, MONTH_NAMES[month])) : null,
        h('tr', {}, ...DAY_NAME_ABBREVIATIONS.map((day) => h('th', {}, day)))
    )
    table.appendChild(header)

    const firstDay = firstDayOfMonth(month, year)
    const length   = daysInMonth(month, year)

    let currentDay = 1

    // first week
    const firstWeek = h('tr', {})
    for(let i = 0; i < firstDay; i++) {
        firstWeek.appendChild(h('td', {}, ''))
    }
    for(let i = firstDay; i < DAY_NAMES.length; i++) {
        firstWeek.appendChild(h('td', {}, i - firstDay + 1 + ''))
        currentDay += 1
    }
    
    // second week
    const secondWeek = h('tr', {})
    for(let i = 0; i < 10; i++) {
        secondWeek.appendChild(h('td', {}, currentDay + ''))
        currentDay += 1
    }

    // third week
    const thirdWeek = h('tr', {})

    for(let i = 0; i < 10; i++) {
        if(currentDay > length) break
        thirdWeek.appendChild(h('td', {}, currentDay + ''))
        currentDay += 1
    }

    table.appendChild(firstWeek)
    table.appendChild(secondWeek)
    table.appendChild(thirdWeek)

    if(currentDay <= length) {
        const fourthWeek = h('tr', {})
        for(; currentDay <= length; currentDay++) {
            fourthWeek.appendChild(h('td', {}, currentDay + ''))
        }
        for(let i = fourthWeek.children.length; i < 10; i++) {
            fourthWeek.appendChild(h('td', {}, ''))
        }
        table.appendChild(fourthWeek)
    }

    return table
}

const calendarEl = document.getElementById('calendar')

const makeWikiInfo = (year, month) => {
    const wikiURL = 'https://maruneko.autumns.page/mediawiki/index.php/'

    const decade = Math.floor(year / 10) * 10
    const century = Math.floor(year / 100) * 100
    const millenium = Math.floor(year / 1000) * 1000

    return h(
        'ul',
        {},
        h('li', {}, h('a', {href: `${wikiURL}${year}CY`}, `This year (${year}CY)`)),
        h('li', {}, h('a', {href: `${wikiURL}${decade}s CY`}, `This decade (${decade}s CY)`)),
        h('li', {}, h('a', {href: `${wikiURL}${century}s CY`}, `This century (${century}s CY)`)),
        h('li', {}, h('a', {href: `${wikiURL}${millenium}s CY`}, `This millenium (${millenium}s CY)`)),
    )
}

const makeCYCalendar = (year, month) => {
    calendarEl.innerHTML = ''
    const cycle = getYearCycle(year)

    if(month) {
        month -= 1
        const header = `${MONTH_NAMES[month]} of the ${cycle} year of ${year}CY`
        calendarEl.appendChild(h('h2', {}, header))
        calendarEl.appendChild(makeMonth(month, year, false))
        return
    }
    
    const header = `The ${cycle} year of ${year}CY`

    calendarEl.appendChild(h('h2', {}, header))

    const months = h('div', {class: 'months'})

    for(let i = 0; i < 10; i++) {
        months.appendChild(makeMonth(i, year, true))
    }

    calendarEl.appendChild(months)
    calendarEl.appendChild(makeWikiInfo(year, month))
}

const monthEl = document.getElementById('month')
const yearEl  = document.getElementById('year')

document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault()

    let month = Number(document.getElementById('month').value)
    let year  = Number(document.getElementById('year').value)

    if(Number.isNaN(month)) {
        alert('Month must be a number.')
        return
    }

    if(Number.isNaN(year)) {
        alert('Year must be a number.')
        return
    } else if (year < 1) {
        alert('Year must be greater than 0.')
        return
    } else if(!Number.isSafeInteger(year)) {
        alert('What the fuck did you do to the year?')
        return
    }

    makeCYCalendar(year, month)
})

makeCYCalendar(4627)