<template>
  <component :is="resolveLayoutVariant" :class="`skin-variant--${appSkinVariant}`">
    <transition :name="appRouteTransition" mode="out-in" appear>
      <router-view></router-view>
    </transition>
    <notifications group="user" ></notifications>
  </component>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { computed } from '@vue/composition-api'
// eslint-disable-next-line import/no-unresolved
import useAppConfig from '@core/@app-config/useAppConfig'
import { useRouter } from '@core/utils'
import { useLayout } from '@core/layouts/composable/useLayout'

// Layouts
import LayoutContentHorizontalNav from '@/layouts/variants/content/horizontal-nav/LayoutContentHorizontalNav.vue'
import LayoutContentVerticalNav from '@/layouts/variants/content/vertical-nav/LayoutContentVerticalNav.vue'
import LayoutDashboardHorizontalNav from '@/layouts/variants/dashboard/horizontal-nav/LayoutDashboardHorizontalNav.vue'
import LayoutDashboardVerticalNav from '@/layouts/variants/dashboard/vertical-nav/LayoutDashboardVerticalNav.vue'
import LayoutBlank from '@/layouts/variants/blank/LayoutBlank.vue'

// Dynamic vh
import useDynamicVh from '@core/utils/useDynamicVh'

export default {
  components: {
    LayoutContentHorizontalNav,
    LayoutContentVerticalNav,
    LayoutDashboardHorizontalNav,
    LayoutDashboardVerticalNav,
    LayoutBlank,
  },
  setup() {
    const { route } = useRouter()
    const { appContentLayoutNav, appSkinVariant, appRouteTransition } = useAppConfig()

    const { handleBreakpointLayoutSwitch } = useLayout()
    handleBreakpointLayoutSwitch()

    const resolveLayoutVariant = computed(() => {
      if (route.value.meta.layout === 'blank') return 'layout-blank'
      if (route.value.meta.layout === 'content') return `layout-content-${appContentLayoutNav.value}-nav`
      if (route.value.meta.layout === 'dashboard') return `layout-dashboard-${appContentLayoutNav.value}-nav`

      return null
    })

    useDynamicVh()

    return {
      resolveLayoutVariant,
      appSkinVariant,
      appRouteTransition,
    }
  },
}
</script>
