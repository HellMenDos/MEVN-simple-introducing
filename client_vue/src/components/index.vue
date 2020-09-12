<template>
  <div class="index">
   <div class="firstsection">
     <h1 class="main_title">Стань таким как я</h1>
     <p class="sub_title">
       Меня зовут Кирилл и буквально за год я стал senior full-stack девулопером, с заработком от 120тыс рублей. <br /><br/>
      А мне всего 16 лет, но я успено проходил собеседования на 3000-4000 и даже 5000$. Нахожусь в 5 лучших фрилансеров программистов Беларуси, нахожусь на 6 месте на крупнейшей бирже СНГ.<br/><br/> Я хочу обучить вас заработку на своих знаниях на фрилансе, так как в текущем мире университеты для получение востребованной и высокооплачиваемой профессии не нужны</p>
     <button class="btn">Начать обучение</button>
   </div>
   <div class="secondsection">
      <div class="first_section">
        <div class="one_photo"></div>
        <div class="two_photo"></div>
      </div>
      <div class="second_section">
        <div class="three_photo"></div>
      </div>
   </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.one_photo {
  width: 60%;
    height: 200px;
    background: black;
    margin: 1%;
    border-radius: 10px;
}
.two_photo {
      width: 38%;
    height: 200px;
    background: black;
    margin: 1%;
    border-radius: 10px;
}
.three_photo {
      height: 200px;
    background: black;
    border-radius: 10px;
    margin: 1%;
}
.second_section  {
  width: 100%;
}
.secondsection {
      flex-direction: column;
}
.first_section {
  width: 100%;
    display: flex;
}
.main_title {
  letter-spacing: 10px;
  width: 100%;
  text-align: left;
  margin-bottom: 30px;
}
.btn {
  background: unset;
    border: none;
    width: 100%;
    padding: 20px;
    border: 2px solid;
    border-radius: 10px;
    text-transform: uppercase;
    letter-spacing: 5px;
    margin-top: 20px;
}
.firstsection {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.sub_title {
  padding: 20px;
  width: 100%;
  text-align: left;
}
.index {
  display: flex;
  flex-wrap: wrap;
}

.index > div {
  display: flex;
  align-items: center;
  justify-content: center;
}
.index > div:first-child {
width: 49%;
margin-right: 1%;
}
.index > div:last-child {
width: 49%;
margin-left: 1%;
}
</style>
