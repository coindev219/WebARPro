<template>
  <div class="auth-wrapper auth-v2">
    <div class="auth-inner">
      <!-- brand logo -->
      <router-link to="/" class="brand-logo d-flex align-center">
        <v-img :src="appLogo" max-height="30px" max-width="30px" alt="logo" contain class="me-3"></v-img>

        <h2 class="text--primary">
          {{ appName }}
        </h2>
      </router-link>
      <!--/ brand logo -->

      <v-row class="auth-row ma-0">
        <v-col lg="8" class="d-none d-lg-block position-relative overflow-hidden pa-0">
          <div class="auth-illustrator-wrapper">
            <!-- triangle bg -->
            <img
              height="362"
              class="auth-mask-bg"
              :src="require(`@/assets/images/misc/mask-v2-${$vuetify.theme.dark ? 'dark' : 'light'}.png`).default"
            />

            <!-- tree -->
            <v-img
              height="226"
              width="300"
              class="auth-tree"
              :src="require('@/assets/images/misc/tree-4.png').default"
            ></v-img>

            <!-- 3d character -->
            <div class="d-flex align-center h-full pa-16 pe-0">
              <v-img
                contain
                max-width="100%"
                height="692"
                class="auth-3d-group"
                :src="
                  require(`@/assets/images/3d-characters/illustration-forgot-password-${
                    $vuetify.theme.dark ? 'dark' : 'light'
                  }.png`).default
                "
              ></v-img>
            </div>
          </div>
        </v-col>

        <v-col lg="4" class="d-flex align-center auth-bg pa-10 pb-0">
          <v-row>
            <v-col cols="12" sm="8" md="6" lg="12" class="mx-auto">
              <v-card flat>
                <v-card-text>
                  <p class="text-2xl font-weight-semibold text--primary mb-2">Forgot Password? 🔒</p>
                  <p class="mb-2">Enter your email and we'll send you instructions to reset your password</p>
                </v-card-text>

                <!-- login form -->
                <v-card-text>
                  <v-form ref="forgotForm" @submit.prevent="handleFormSubmit">
                    <v-text-field
                      v-model="email"
                      outlined
                      label="Email"
                      placeholder="john@example.com"
                      :error-messages="errorMessages.email"
                      :rules="[validators.required, validators.emailValidator]"
                      hide-details="auto"
                      class="mb-4"
                    ></v-text-field>

                    <v-btn type="submit" block color="primary"> Send reset link </v-btn>
                  </v-form>
                </v-card-text>

                <v-card-actions class="d-flex justify-center align-center">
                  <router-link :to="{ name: 'auth-login' }" class="d-flex align-center text-sm">
                    <v-icon size="24" color="primary">
                      {{ icons.mdiChevronLeft }}
                    </v-icon>
                    <span>Back to login</span>
                  </router-link>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { mdiChevronLeft } from '@mdi/js'
import { ref } from '@vue/composition-api'
import axios from '@axios'
import { required, emailValidator } from '@core/utils/validation'
import themeConfig from '@themeConfig'

export default {
  setup() {
    const forgotForm = ref(null)
    const isPasswordVisible = ref(false)
    const email = ref('')
    const errorMessages = ref([])

    const handleFormSubmit = () => {
      const isFormValid = forgotForm.value.validate()
      if (!isFormValid) return

      axios
        .post('/api/auth/forget-password', { email: email.value })
        .then(response => {
          console.log(response.data)
        })
        .catch(error => {
          // TODO: Next Update - Show notification
          console.error('Oops, Unable to send password reset link!')
          console.log('error :>> ', error.response)

          errorMessages.value = error.response.data.message
        })
    }

    return {
      handleFormSubmit,

      isPasswordVisible,
      email,
      errorMessages,

      // themeConfig
      appName: themeConfig.app.name,
      appLogo: themeConfig.app.logo,

      icons: {
        mdiChevronLeft,
      },
      validators: {
        required,
        emailValidator,
      },

      // Template Refs
      forgotForm,
    }
  },
}
</script>

<style lang="scss">
@import '@resources/sass/preset/pages/auth.scss';
</style>
