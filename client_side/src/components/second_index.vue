<template>
  <div class="index">
   <div class="secondsection">
    <div class="second_section">
      <div class="two_photo"></div>
        <div class="one_photo"></div>
      </div>
      <div class="first_section">
        <div class="one_photo"></div>
        <div class="two_photo"></div>
      </div>
   </div>

    <div class="firstsection">
     <h1 class="main_title">Не слушай бредни старшего поколения</h1>
     <p class="sub_title">
       Сейчас так быстро все меняется, что слушать людей, которые не ориентируются в текущем мире очень и очень глупо.<br> Старшее поколение не понимают реальности текущего мироустройста, так как им всю жизнь говорили о том что нужно отучиться в университете и будет в жизни все, но это далеко не так.<br><br> В любой момент вы можете научиться тому, чтобы быть самостоятельным с финансовой точки зрения и я вам хочу с этим помоч, так как у меня есть большой опыт в работе с различными заказчиками с различными сферами и технологиями.<br> Пройдя курс "Из грязи в книзя" вы уже можете зарабатывать деньги, а курс идет в районе 3 часов. На твоем месете я сразу бы ринулся в курс, удачи !
     </p>
     
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
  display: flex;
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
    margin-top: 40px;
}
.index {
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