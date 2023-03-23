<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://bulma.io">
        <router-link to="/aboutus"> About Us </router-link>
      </a>
      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <!-- https://stackoverflow.com/questions/39344574/how-pass-variable-to-vue-router-v-link -->
    <div id="navbarBasicExample" class="navbar-menu">
      <router-link to="#" class="button"> 고속도로별 </router-link>
      <router-link to="#" class="button"> 지역별 </router-link>

      <div v-if="!loginStatus" class="login-menu">
        <router-link to="/auth/sign-up" class="button is-primary">
          <strong>Sign up</strong>
        </router-link>
        <router-link to="/auth/sign-in" class="button is-light"> Log in </router-link>
      </div>
      <div v-else>
        <router-link to="/auth/me" class="button user-menu"> My page </router-link>
        <router-link to="#" @click="logout()" class="button is-light"> Log out </router-link>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
  // https://stackoverflow.com/questions/45116796/how-to-import-and-use-image-in-a-vue-single-file-component
  // https://vitejs-kr.github.io/guide/assets.html#the-public-directory
  import { ref } from 'vue';
  // https://stackoverflow.com/questions/65284428/how-to-get-params-of-router-in-vue-3
  import { useRoute } from 'vue-router';

  const route = useRoute();
  // https://velog.io/@shelly/Vue3-마운트-직전후에-route-params-또는-query가undefined인-현상-해결하기-route-guard-사용하기

  // const userToLoad = computed(() => route.params.userId);

  const loginStatus = ref<Boolean>(false);

  const siteUrl = ref<string>(window.location.pathname);

  document.addEventListener('DOMContentLoaded', () => {
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(
      document.querySelectorAll('.navbar-burger'),
      0,
    );

    // Add a click event on each of them
    $navbarBurgers.forEach((el) => {
      el.addEventListener('click', () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const _target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        _target?.classList.toggle('is-active');
      });
    });
  });

  const getSiteUrl = () => {
    // 이러면 Status 가 변경되었다는 것을 template 에서 인식할 수 있나요?
    siteUrl.value = window.location.pathname;
  };

  const loginTrue = () => {
    if ((localStorage.getItem('token') as string) !== '') {
      loginStatus.value = true;
    } else {
      loginStatus.value = false;
    }
  };

  const logout = () => {
    localStorage.setItem('token', '');
    localStorage.setItem('name', '');
    window.location.reload();
  };

  // 이름 나타내는 태그 없이 프로필 이미지 선택 시 dropdown 방식 채택
  // const name = localStorage.getItem('name');

  loginTrue();
</script>

<style scoped>
  .headerDesign {
    max-width: 100%;
    margin: 0 auto;
    max-height: 100%;
  }
  .image-wrapper {
    width: 50%;
  }
  .logo {
    max-width: 100%;
    height: auto;
  }
  .profile {
    max-width: 100%;
    height: auto;
  }
  .btn {
    width: 100%;
  }

  .navbar-burger {
    display: inline;
  }

  .navbar {
    align-items: stretch;
    display: flex;
    flex-direction: column;
  }

  .navbar-menu.is-active {
    padding: 60px 10px 10px 10px;
    display: block;
    position: absolute;
  }

  .navbar-menu {
    display: none;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
    border-radius: 10px;
    position: absolute;
    right: 0;
    left: auto;
    height: 100vh;
    width: 300px;
    background-color: white;
    z-index: -1;
  }
  .login-menu {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .router-link-active {
    display: block;
  }
  .navbar-menu .button {
    border-style: none;
    margin: 3px;
  }
  .navbar-menu .button:focus {
    border-style: none;
  }
</style>
