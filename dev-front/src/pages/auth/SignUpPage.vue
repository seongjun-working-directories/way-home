<template>
  <section id="signup">
    <div class="signup__form">
      <div class="signup__title">
        <img src="/images/wayhome_logo.webp" alt="" width="60" height="60" />
        <h1>Sign Up</h1>
      </div>
      <!-- <label for="inputEmail" class="sr-only">이메일</label> -->
      <div class="signup__info">
        <div class="signup__form-item">
          <label for="inputName ">이름</label>
          <input
            id="inputName"
            v-model="userName"
            type="text"
            placeholder="이름을 입력해주세요"
            required
            autofocus
            @input="activateSignupButton()"
          />
        </div>
        <div class="signup__form-item signup__form-email">
          <label for="inputEmail">이메일</label>
          <div></div>
          <input
            id="inputEmail"
            v-model="userEmail"
            type="email"
            placeholder="이메일을 입력해주세요"
            required
            autofocus
            @input="activateSignupButton()"
          />
          <button class="email-submit-btn" @click="emailAuthentication()"> 전송 </button>
        </div>
        <div v-if="emailSendBtn" class="signup__form-item signup__form-email-auth">
          <label v-if="emailSendBtn" for="emailAuthNumber">인증번호</label>
          <input
            v-if="emailSendBtn"
            id="emailAuthNumber"
            v-model="emailCertificationNumber"
            type="text"
            placeholder="인증번호를 입력해주세요"
            @input="activateSignupButton()"
          />
          <button v-if="emailSendBtn" class="email-auth-btn" @click="emailAuthentication()">
            인증
          </button>
        </div>
        <div class="signup__form-item">
          <label for="inputNickName">닉네임</label>
          <input
            id="inputNickName"
            v-model="userNickname"
            type="text"
            placeholder="닉네임을 입력해주세요"
            required
            autofocus
            @input="activateSignupButton()"
          />
        </div>
        <!-- <label for="inputPassword" class="sr-only">비밀번호</label> -->
        <div class="signup__form-item">
          <label for="inputPassword">비밀번호</label>
          <input
            id="inputPassword"
            v-model="userPassword"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            required
            @input="passwordVerify(), activateSignupButton()"
          />
        </div>
        <!-- <label for="inputPasswordCheck" class="sr-only">비밀번호 확인</label> -->
        <div class="signup__form-item">
          <label for="inputPasswordCheck">비밀번호 확인</label>
          <input
            id="inputPasswordCheck"
            v-model="passwordVerification"
            type="password"
            placeholder="비밀번호를 한번 더 입력해주세요"
            required
            @input="passwordVerify(), activateSignupButton()"
          />
        </div>
        <div
          v-if="!passwordAuthen && passwordVerification"
          id="signup__info-warning"
          class="signup__info-notice"
        >
          <span>비밀번호가 일치하지 않습니다</span>
        </div>
        <div
          v-if="passwordAuthen && passwordVerification"
          id="signup__info-concide"
          class="signup__info-notice"
        >
          <span>비밀번호가 일치합니다</span>
        </div>

        <!-- <label for="inputPhonenumber" class="sr-only">휴대폰 번호</label> -->
        <div class="signup__form-item">
          <label for="inputPhoneNumber">휴대폰 번호</label>
          <input
            id="inputPhoneNumber"
            v-model="userPhoneNumber"
            type="text"
            placeholder="휴대폰 번호를 입력해주세요"
            required
            maxlength="13"
            @input="phoneNumberVerify(), activateSignupButton()"
          />
        </div>
        <div v-if="userAlready" class="signup__info-notice"> 이미 아이디가 존재합니다. </div>

        <div class="signup__info-agree">
          <label class="signup__info-privacy">
            <input v-model="privacyAgree" type="checkbox" @click="activateSignupButton()" />개인정보
            수집 및 이용 동의(필수)
          </label>
          <label class="signup__info-advertise">
            <input v-model="advertiseAgree" type="checkbox" />광고 수신 동의(선택)
          </label>
        </div>
      </div>

      <div class="signup__btn">
        <button class="btn-lg btn-block" type="submit" @click="sign"> 회원가입 </button>
      </div>
      <br />
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import axi from '@way-home/modules/api/axios';
  import type { Ref } from 'vue';
  import type { SignupData } from '@way-home/modules/api/types';

  const userName: Ref<string> = ref('');
  const userEmail: Ref<string> = ref('');
  const userNickname: Ref<string> = ref('');
  const userPassword: Ref<string> = ref(''); // 비밀번호
  const passwordVerification: Ref<string> = ref(''); // 비밀번호 확인
  const passwordAuthen: Ref<boolean> = ref(false); // 비밀번호 일치 여부
  const userPhoneNumber: Ref<string> = ref('');
  const privacyAgree: Ref<boolean> = ref(false);
  const advertiseAgree: Ref<boolean> = ref(false);
  const emailSendBtn: Ref<boolean> = ref(false); // 이메일 전송 버튼 클릭 여부
  const emailCertificationNumber: Ref<string> | Ref<number> = ref(''); // 이메일 인증번호
  const emailAuthen: Ref<boolean> = ref(false); // 이메일 인증 여부
  const userAlready: Ref<boolean> = ref(false); // 사용자 가입 여부

  async function sign() {
    if (!emailverify()) {
      alert('이메일형식에 맞지 않습니다!');
      return;
    } else if (!emailAuthen.value) {
      alert('이메일 인증해주세요!');
    } else if (!userName.value) {
      alert('사용자 이름을 입력해주세요!');
      return;
    } else if (!userNickname.value) {
      alert('사용자 닉네임을 입력해주세요!');
      return;
    } else if (!userPassword.value || !passwordVerification.value || !passwordAuthen.value) {
      alert('비밀번호가 맞지 않습니다!');
      return;
    } else if (!userPhoneNumber.value) {
      alert('휴대폰 번호를 입력해주세요!');
      return;
    } else if (!privacyAgree.value) {
      alert('개인정보 수집에 동의해주세요!');
      return;
    }
    const userInfo: SignupData = {
      email: userEmail.value,
      password: userPassword.value,
      name: userName.value,
      mobile: userPhoneNumber.value,
      nickname: userNickname.value,
      privacyPolicy: privacyAgree.value,
      advertisePolicy: advertiseAgree.value,
    };
    const pass = await axi.methods.$callAPI('POST', '/api/signup', userInfo);
    if (pass.status == 409) {
      pass.data.errors.forEach((element: any) => {
        alert(element.msg);
      });
    } else {
      alert('가입해주셔서 감사합니다!');
      // this.$router.push('/');
    }
  }
  function emailverify() {
    const regExp = new RegExp('[a-z0-9]+@[a-z]+\\.com');
    if (regExp.test(userEmail.value)) {
      return true;
    } else {
      return false;
    }
  }
  function passwordVerify() {
    if (userPassword.value === passwordVerification.value) {
      passwordAuthen.value = true;
    } else {
      passwordAuthen.value = false;
    }
  }

  function phoneNumberVerify() {
    if (userPhoneNumber.value.length == 3 || userPhoneNumber.value.length == 8) {
      userPhoneNumber.value += '-';
    }
  }

  function activateSignupButton() {
    const signupButton = document.querySelector('.signup__btn button');
    if (
      userName.value.length !== 0 &&
      userEmail.value.length !== 0 &&
      userNickname.value.length !== 0 &&
      userPassword.value.length !== 0 &&
      passwordVerification.value.length !== 0 &&
      emailCertificationNumber.value.toString().length !== 0 &&
      userPhoneNumber.value.length !== 0
    ) {
      console.log(privacyAgree.value);
      if (privacyAgree.value === true) {
        // boolean 변수 초기 값에 따라 수정하기
        signupButton?.classList.add('activate_signup_btn');
      }
    } else {
      signupButton?.classList.remove('activate_signup_btn');
    }
  }
  async function emailAuthentication() {
    emailSendBtn.value = true;
    await axi.methods.$callAPI('GET', '/api/emailAuthentication').then((res) => {
      emailAuthen.value = res.data.email;
    });
  }
</script>

<style scoped>
  .signup__title {
    padding: 20px 0 10px 0;
  }
  .signup__form {
    width: 400px;
    margin: auto;
    margin-top: 20px;
    padding: 0 15px 25px 18px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    border-radius: 8px;
    box-shadow: 3px 3px 3px 3px gray;
  }
  .signup__form {
    z-index: 2;
    border: none;
  }
  .signup__form h1 {
    color: rgb(53, 127, 232);
    font-weight: 1000;
  }
  .signup__form {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
    color: #5e6472;
  }
  .signup__form input[type='email'] {
    width: 90%;
    height: 50px;
    border-radius: 8px;
    margin: 0 auto;
    margin-bottom: 8px;
  }
  .signup__form input[type='password'] {
    width: 90%;
    height: 50px;
    border-radius: 8px;
    margin: 0 auto;
    margin-bottom: 8px;
  }
  .signup__form input[type='text'] {
    width: 90%;
    height: 50px;
    border-radius: 8px;
    margin: 0 auto;
    margin-bottom: 8px;
  }
  .signup__form-item {
    display: inline-flex;
    width: 100%;
    margin: 0 auto;
    padding: 0 3px 0 3px;
  }
  .signup__form-item label {
    display: flex;
    text-align: center;
    margin: 0;
    padding: 16px 2px 0 0;
    width: 120px;
  }
  .signup__form-email,
  .signup__form-email-auth {
    margin: 0 auto;
    margin-left: 0;
    display: inline-flex;
  }
  .signup__form-email label,
  .signup__form-email-auth label {
    width: 160px;
  }
  .signup__form-email .email-submit-btn,
  .signup__form-email-auth .email-auth-btn {
    width: 70px;
    border-radius: 8px;
    margin: 0 0 8px 5px;
    background-color: white;
  }
  .signup__info-agree {
    padding: 20px;
    text-align: left;
  }
  .signup__info-notice {
    margin: -1px 0 2px 100px;
  }
  #signup__info-warning {
    color: red;
  }
  #signup__info-concide {
    color: green;
  }
  .signup__info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .signup__info input {
    margin: 4px;
  }
  .btn {
    width: 90%;
    border-radius: 8px;
    display: block;
    margin: 0 auto;
    font-size: 20px;
    background-color: #e5e4e4;
    color: #acacac;
  }
  .activate_signup_btn {
    background-color: var(--bs-link-color);
    color: white;
  }
</style>
