<template>
  <section id="login">
    <div class="login__form">
      <div class="login__title">
        <img src="/images/wayhome_logo.webp" alt="" width="60" height="60" />
        <h1>Sign In</h1>
      </div>
      <!-- <label for="inputEmail" class="sr-only">이메일</label> -->
      <div class="login__info">
        <input
          id="inputEmail"
          v-model="userEmail"
          type="email"
          placeholder="이메일"
          required
          autofocus
          @input="activateLoginButton()"
        />
        <!-- <label for="inputPassword" class="sr-only">비밀번호</label> -->
        <input
          id="inputPassword"
          v-model="userPassword"
          type="password"
          placeholder="비밀번호"
          required
          @input="activateLoginButton()"
        />
        <!-- <input type="checkbox" value="remember-me" id="loginCheck" />-->
        <label class="login__info-checkbox">
          <input v-model="loginStateCheck" type="checkbox" />
          로그인 상태 유지
        </label>
      </div>

      <div v-if="userCorrect" class="login__info-state">
        아이디 또는 비밀번호를 잘못 입력했습니다.
      </div>
      <div class="login__btn">
        <button type="submit" @click="login()"> 로그인 </button>
      </div>
      <br />
      <div class="login__help">
        <div>
          <router-link to="/auth/find-me"> 아이디 찾기 </router-link>
        </div>
        <div>
          <router-link to="/signup"> 회원가입 </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import axios from '@way-home/modules/api/axios';
  import type { SigninData, tokenData, HighwayData } from '@way-home/modules/api/types/';
  import type { Ref } from 'vue';

  const userEmail: Ref<string> = ref('');
  const userPassword: Ref<string> = ref('');
  const loginStateCheck: Ref<boolean> = ref(false);
  let password: any = '';
  const userCorrect = false;
  let nameData: any = '';
  let highwayAPIData: any = '';

  async function login() {
    const userInformation: SigninData = {
      email: userEmail.value,
      password: userPassword.value,
      loginState: loginStateCheck.value,
    };

    password = await axios.methods.$callAPI('POST', '/api/signin', userInformation).catch((e) => {
      console.log(e);
    });
    // [TEST] console.dir(password);

    if (password.status == 409 && userCorrect) {
      alert('이메일을 확인해주세요!');
    } else if (password.status == 408) {
      alert('비밀번호를 확인해주세요');
    } else if (password.status === 200) {
      //console.log(password);

      const token: string = password.data.token;
      // token을 브라우저 쿠키에 저장하는 코드
      localStorage.setItem('token', token);

      const tokenrInformation: tokenData = {
        token,
      };

      nameData = await axios.methods
        .$callAPI('POST', '/api/checktoken', tokenrInformation)
        .catch((e) => {
          console.log(e);
        });

      highwayAPIData = await axios.methods.$callAPI('GET', '/api/svarInfos');

      const highwayDataArray: HighwayData[] = [{ svarCd: '-', routeNm: '-', svarNm: '공통' }];

      for (let i = 0; i < highwayAPIData.data.result.length; i++) {
        if (highwayAPIData.data.result[i].svarNm.match('휴게소')) {
          highwayDataArray.push({
            svarCd: highwayAPIData.data.result[i].svarCd,
            routeNm: highwayAPIData.data.result[i].routeNm,
            svarNm: highwayAPIData.data.result[i].svarNm,
          });
        }
      }

      localStorage.setItem('highwayDataArray', JSON.stringify(highwayDataArray));

      //추후 닉네임으로 수정 필요!
      const name: string = nameData.data.result.name;
      localStorage.setItem('name', name);

      window.location.href = '/';
    } else {
      // alert('성공적으로 로그인되었습니다');
      //
    }
    // if (password) {
    //   alert('다시 확인해주세요!');
    // } else {
    //   // 서버로부터 일치 여부를 coincide로 return
    //   if (password.data.coincide == 'true') {
    //     this.$router.push('/');
    //   } else {
    //     userCorrect = true;
    //     return;
    //   }
    // }
  }
  // if (password) {
  //   alert('다시 확인해주세요!');
  // } else {
  //   // 서버로부터 일치 여부를 coincide로 return
  //   if (password.data.coincide == 'true') {
  //     this.$router.push('/');
  //   } else {
  //     userCorrect = true;
  //     return;
  //   }
  // }

  function activateLoginButton() {
    const loginButton = document.querySelector('.login__btn button');
    if (userEmail.value.length !== 0 && userPassword.value.length !== 0) {
      loginButton?.classList.add('activate_login_btn');
    } else {
      loginButton?.classList.remove('activate_login_btn');
    }
  }
</script>

<style scoped>
  :root {
    --color-main: blue;
  }
  * {
    box-sizing: border-box;
  }
  html,
  body {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: #f5f5f5;
  }
  .login__title {
    padding: 20px 0 10px 0;
  }
  .login__form {
    width: 350px;
    margin: auto;
    margin-top: 20px;
    padding: 0 15px 25px 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    border-radius: 8px;
    box-shadow: 3px 3px 3px 3px gray;
  }
  .login__form h1 {
    color: rgb(53, 127, 232);
    font-weight: 1000;
  }
  .login__form {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
    color: #5e6472;
  }
  .login__form {
    z-index: 2;
    border: none;
  }
  .login__form input[type='email'] {
    width: 90%;
    height: 50px;
    margin: 0 auto;
    border-radius: 8px;
    margin-bottom: 8px;
  }
  .login__form input[type='password'] {
    width: 90%;
    height: 50px;
    margin: 0 auto;
    border-radius: 8px;
  }
  .login__info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .login__info-checkbox {
    font-weight: 400;
    margin-top: 8px;
    padding: 20px;
    display: flex;
    align-items: center;
  }
  .login__info-state {
    color: red;
    font-size: 16px;
  }
  .btn {
    width: 90%;
    border-radius: 8px;
    display: block;
    margin: 0 auto;
    font-size: 20px;
    background-color: #e5e4e4;
  }
  .login__help {
    font-size: 16px;
    display: flex;
    justify-content: space-around;
  }
</style>
