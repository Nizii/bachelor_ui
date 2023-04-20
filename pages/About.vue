<template>
  <div style="margin: 0; padding: 0; box-sizing: border-box;">
    <Header />
    <MainTabbar />
    <div style="text-align: center; margin: 20px;">
        <h2>Über Uns</h2>
        <p class="txt">Wir sind ein kreatives Duo, bestehend aus einem Informatik-Studenten und einem Design-Studenten.</p>
        <br>
        <h3>Unsere Leidenschaft für Wein</h3>
        <p class="txt">Unsere Begeisterung für Wein hat uns auf zahlreiche Reisen und Entdeckungen geführt. Zusammen haben wir Weindegustationen besucht in der Toskana sowie auf dem malerischen Wii-Schiff in Luzern und haben in der Schule eigene Weinproben organisiert. Dabei konnten wir unser Wissen erweitern und unsere Leidenschaft für Wein vertiefen.</p>
        <br>
        <h3>Bilder</h3>
        <div style="display: flex; justify-content: space-between; flex-wrap: wrap;">
            <img src="/3.jpg" alt="Bild 1" style="width: 30%; margin-bottom: 20px;">
            <img src="/2.jpg" alt="Bild 2" style="width: 30%; margin-bottom: 20px;">
            <img src="/4.jpg" alt="Bild 2" style="width: 30%; margin-bottom: 20px;">
        </div>
        <br>
    </div>
    <Tabbar />
  </div>
</template>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.txt{
  font-size: 15px;
}
</style>