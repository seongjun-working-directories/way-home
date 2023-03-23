<template>
  <section id="find">
    <div class="find__form">
      <div class="find__title">
        <img class="mb-4" src="/images/wayhome_logo.webp" alt="" width="60" height="60" />
        <h1 class="mb-3">Find ID</h1>
      </div>
      <div class="find__info">
        <input
          id="inputName"
          v-model="userName"
          type="text"
          class="form-control"
          placeholder="이름"
          required
          autofocus
        />

        <input
          id="inputPhonenumber"
          v-model="userPhoneNumber"
          type="text"
          class="form-control"
          placeholder="휴대폰 번호"
          required
          maxlength="13"
          @input="phoneNumberVerify()"
        />
        <input
          v-if="cerificationNumberSendState"
          v-model="cerificationNumber"
          type="text"
          placeholder="인증번호"
          style="width: 20%"
          maxlength="6"
        />
        <button
          v-if="cerificationNumberSendState"
          type="submit"
          class="find__info-config"
          @click="cerificationNumberConfigure()"
        >
          {{ certificationText }}
        </button>
        <button class="find__info-btn" type="submit" @click="cerificationNumberSend()">
          전송
        </button>
      </div>
      <div>
        <button class="find__btn" type="submit" @click="login()"> 아이디 찾기 </button>
      </div>
      <div v-if="userId">사용자님의 아이디는 {{ userId }} 입니다</div>
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import axi from '@way-home/modules/api/axios';
  import type { FindIdData as FindMeData } from '@way-home/modules/api/types';
  import type { Ref } from 'vue';

  const userName = '';
  const userPhoneNumber: Ref<string> = ref('');
  let userId = '';
  let pass: any = null;
  const cerificationNumber: Ref<number> = ref(0);
  const certificationAnswer: Ref<number> = ref(0);
  const cerificationNumberSendState: Ref<boolean> = ref(false);
  const certificationText: Ref<string> = ref('인증');
  async function login() {
    const userInformation: FindMeData = {
      name: userName,
      mobile: userPhoneNumber.value,
    };

    pass = await axi.methods.$callAPI('POST', 'https//localhost:5000/test', userInformation);

    // 서버로부터 아이디 존재 여부를 coincide, userId로 return
    if (pass.data.coincide == 'false') {
      alert('아이디가 존재하지 않습니다!');
    } else {
      userId = pass.data.userId;
    }
  }

  function phoneNumberVerify() {
    console.log(userPhoneNumber.value);

    if (userPhoneNumber.value.length == 3 || userPhoneNumber.value.length == 8) {
      userPhoneNumber.value += '-';
    }
  }
  async function cerificationNumberSend() {
    cerificationNumberSendState.value = true;
    console.log(cerificationNumberSendState);
    await axi.methods.$callAPI('GET', 'http://localhost:3000/sms').then((res) => {
      certificationAnswer.value = res.data.number;
      console.log(certificationAnswer);
    });
  }

  function cerificationNumberConfigure() {
    if (Number(cerificationNumber.value) === certificationAnswer.value) {
      certificationText.value = '확인';
      const target1: any = document.querySelector('.find__info-config');
      const target2: any = document.querySelector('.find__info-btn');
      target1.disabled = true;
      target2.disabled = true;
    } else {
      alert('인증번호가 옳지 않습니다!');
    }
  }
</script>

<style scoped>
  html,
  body {
    height: 100%;
  }
  body {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: #f5f5f5;
  }
  .find__form {
    position: relative;
    width: 100%;
    max-width: 560px;
    padding: 15px;
    margin: auto;
    border: 1px solid black;
    height: 560px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    border-radius: 32px;
  }
  .find__form .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
  }
  .find__form .form-control:focus {
    z-index: 2;
  }
  .find__form input[type='text'] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    width: 70%;
    height: 50px;
    margin: 0 auto;
    border-radius: 16px;
    margin-bottom: 8px;
  }
  .find__form h1 {
    color: blue;
    font-weight: 1000;
  }
  .find__title {
    height: 40%;
  }
  .find__info {
    height: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .find__info-config {
    position: absolute;
    top: 58%;
    right: 5%;
    background-color: white;
    border-radius: 8px;
    display: block;
    font-size: 16px;
  }
  .find__info-btn {
    position: absolute;
    top: 48%;
    right: 5%;
    background-color: white;
    border-radius: 8px;
    display: block;
    font-size: 16px;
  }
  .find__btn {
    background-color: white;
    margin: 0 auto;
    margin-bottom: 10%;
    border-radius: 8px;
    width: 50%;
    height: 60px;
    display: block;
    font-size: 20px;
  }
</style>
