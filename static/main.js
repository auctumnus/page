const navSetup = () => {
    const navToggle = document.querySelector('#nav-toggle')
    const nav = document.querySelector('nav')

    navToggle.addEventListener('click', (e) => {
        if(!navToggle.checked) {
            e.preventDefault()
            nav.classList.add('closed')
            setTimeout(() => {
                navToggle.checked = false;
                nav.classList.remove('closed')
            }, 200)

            navToggle.classList.add('closed')
            setTimeout(() => {
                navToggle.classList.remove('closed')
            }, 200)
        }
    })
}

const easing = 'cubic-bezier(0.2, 0.0, 0, 1.0)'

const asideSetup = () => {
    document.querySelectorAll('details.aside').forEach((aside) => {
        const summary = aside.querySelector('summary')
        const content = aside.querySelector('div')

        let animation = null

        let isClosing = false;
        let isExpanding = false;

        const onAnimationFinish = (open) => {
            aside.open = open;
            animation = null;

            isClosing = false;
            isExpanding = false;

            aside.style.height = aside.style.overflow = '';
        }

        const expand = () => {
            isExpanding = true
            const startHeight = aside.offsetHeight + 'px';
            const endHeight = summary.offsetHeight + content.offsetHeight + 'px';
            
            if (animation) {
                animation.cancel();
            }
            
            animation = aside.animate(
                { height: [startHeight, endHeight] },
                { duration: 200, easing }
            );
            animation.onfinish = () => onAnimationFinish(true);
            animation.oncancel = () => { isExpanding = false };
        }

        const open = () => {
            aside.style.height = aside.offsetHeight + 'px'
            aside.open = true
            requestAnimationFrame(expand)
        }

        const close = () => {
            isClosing = true;
            
            const startHeight = aside.offsetHeight + 'px'
            const endHeight = summary.offsetHeight + 'px';
            
            if (animation) {
                animation.cancel();
            }
            
            animation = aside.animate(
                { height: [startHeight, endHeight] },
                { duration: 200, easing }
            );
            
            animation.onfinish = () => onAnimationFinish(false);
            animation.oncancel = () => { isClosing = false };
        }
        
        summary.addEventListener('click', (e) => {
            e.preventDefault()
            aside.style.overflow = 'hidden'

            if(isClosing || !aside.open) {
                open()
            } else if(isExpanding || aside.open) {
                close()
            }
        })
    })
}

document.addEventListener('DOMContentLoaded', () => {
    asideSetup()
    navSetup()
})