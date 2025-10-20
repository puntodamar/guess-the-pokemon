import { ref, onUnmounted } from 'vue'


const breakpoints = {
    sm: '(max-width: 39.999rem)',   // < 640px
    md: '(max-width: 47.999rem)',   // < 768px
    lg: '(max-width: 63.999rem)',   // < 1024px
    xl: '(max-width: 79.999rem)',   // < 1280px
    xxl: '(max-width: 95.999rem)',  // < 1536px
}


export const sm = ref(false)
export const md = ref(false)
export const lg = ref(false)
export const xl = ref(false)
export const xxl = ref(false)
export const isMobile = ref(false)

let mediaList = []

function setupMediaQueries() {
    if (typeof window === 'undefined') return // SSR-safe
    
    for (const [key, query] of Object.entries(breakpoints)) {
        const mq = window.matchMedia(query)
        const update = () => {
            const val = mq.matches
            if (key === 'sm') sm.value = val
            if (key === 'md') md.value = val
            if (key === 'lg') lg.value = val
            if (key === 'xl') xl.value = val
            if (key === 'xxl') xxl.value = val
            isMobile.value = lg.value // alias for <1024px
        }
        
        update()
        mq.addEventListener('change', update)
        mediaList.push({ mq, update })
    }
}

function cleanup() {
    for (const { mq, update } of mediaList) {
        mq.removeEventListener('change', update)
    }
    mediaList = []
}

if (typeof window !== 'undefined') {
    setupMediaQueries()
    window.addEventListener('beforeunload', cleanup)
}

export default { sm, md, lg, xl, xxl, isMobile }
