// eslint-disable-next-line object-curly-newline
import { getCurrentInstance, reactive, toRefs, watch } from '@vue/composition-api'

// export const isObject = obj => typeof obj === 'object' && obj !== null
export const isObject = obj => obj === Object(obj) && !isArray(obj) && typeof obj !== 'function'

export const isArray = array => Array.isArray(array)

export const isToday = date => {
  const today = new Date()

  return (
    /* eslint-disable operator-linebreak */
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
    /* eslint-enable */
  )
}

export const dateInPast = (firstDate, secondDate) => {
  if (firstDate.setHours(0, 0, 0, 0) <= secondDate.setHours(0, 0, 0, 0)) {
    return true
  }

  return false
}

export const daysLeft = (firstDate, secondDate ) => {
  const timeLeft = firstDate.setHours(0, 0, 0, 0) - secondDate.setHours(0, 0, 0, 0)

  if (timeLeft > 0) {
    // get total seconds between the times
    let seconds = Math.floor(timeLeft / 1000)
    let minutes = Math.floor(seconds / 60)
    let hours = Math.floor(seconds / 3600)
    let days = Math.floor(seconds / 86400)
    return {
      minutes,
      hours,
      days,
    }
  }

  return null
}

export const getVuetify = () => {
  const ins = getCurrentInstance()?.proxy

  return ins && ins.$vuetify ? ins.$vuetify : null
}

// Thanks: https://medium.com/better-programming/reactive-vue-routes-with-the-composition-api-18c1abd878d1
export const useRouter = () => {
  const vm = getCurrentInstance().proxy

  const state = reactive({
    route: vm.$route,
  })

  watch(
    () => vm.$route,
    r => {
      state.route = r
    },
  )

  return { ...toRefs(state), router: vm.$router }
}

export const isEmpty = value => {
  if (value === null || value === undefined || value === '') {
    return true
  }

  if (Array.isArray(value) && value.length === 0) {
    return true
  }

  return false
}

// ——— Get Initial Text from name ——————— //

export const getInitialName = fullName =>
  // eslint-disable-next-line implicit-arrow-linebreak
  fullName
    .split(' ')
    .map(n => n[0])
    .join('')

// ——— Add Alpha To color ——————— //

export const addAlpha = (color, opacity) => {
  const opacityLocal = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255)

  return color + opacityLocal.toString(16).toUpperCase()
}

// ——— Perfect Scrollbar Scroll to bottom ——————— //

export const psScrollToBottom = psRef => () => {
  const scrollEl = psRef.value.$el || psRef.value
  scrollEl.scrollTop = scrollEl.scrollHeight
}

// ——— Perfect Scrollbar Scroll to bottom ——————— //

export const psScrollToTop = psRef => () => {
  const scrollEl = psRef.value.$el || psRef.value
  scrollEl.scrollTop = 0
}

// ————————————————————————————————————
//* ——— Color Manipulations
// ————————————————————————————————————

// Thanks: https://stackoverflow.com/a/5624139/10796681
export const rgbToHex = (r, g, b) => {
  const componentToHex = c => {
    const hex = c.toString(16)

    return hex.length === 1 ? `0${hex}` : hex
  }

  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`
}

// Thanks: https://stackoverflow.com/a/5624139/10796681
export const hexToRgb = hex => {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  // eslint-disable-next-line no-param-reassign
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b)

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

  /* eslint-disable indent */
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
  /* eslint-enable */
}

// ————————————————————————————————————
//* ——— Convert role to abilities
// ————————————————————————————————————

export const roleToAbility = role => {
  switch (role) {
    case 1: return [
      {
        action: 'read',
        subject: 'Public'
      },
      {
        action: 'access',
        subject: 'user'
      }];
    case 2: return [
      {
        action: 'read',
        subject: 'Public'
      },
      {
        action: 'manage',
        subject: 'all'
      }];
    case 3: return [
      {
        action: 'read',
        subject: 'Public'
      },
      {
        action: 'manage',
        subject: 'all'
      }];
    default: return [
      {
      action: 'read',
      subject: 'Public'
    }];
  }
}

export const checkAbilityHasAction = (arr, action) => {
  return arr.some(el => el.action === action);
}

// ————————————————————————————————————
//* ——— Convert object keys to camel case
// ————————————————————————————————————

export const toCamel = (s) => {
  return s.replace(/([-_][a-z])/ig, ($1) => {
    return $1.toUpperCase()
      .replace('-', '')
      .replace('_', '');
  });
};

// convert object keys to camel case
export const keysToCamel = (o) => {
  if (isObject(o)) {
    const n = {};

    Object.keys(o)
      .forEach((k) => {
        n[toCamel(k)] = keysToCamel(o[k]);
      });

    return n;
  } else if (isArray(o)) {
    return o.map((i) => {
      return keysToCamel(i);
    });
  }

  return o;
};

// verify json parse
export const validJSONParse = (str) => {
  try {
    let obj = JSON.parse(str);
    return obj;
  } catch (e) {
    return null;
  }
}

// round with decimal precision function
export const roundToDecimal = (value, precision) => {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

// vue-notification
export const getVueNotification = () => {
  const ins = getCurrentInstance()?.proxy

  return ins && ins.$notify ? ins.$notify : null
}
