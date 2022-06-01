<template>
  <div class="container-footer">
    <div class="footers">
      <p>copy of Netflix, Inc.</p>
      <p>Romain Michel et Yannis Loisel</p>
    </div>
  </div>
</template>
<style>
.container-footer {
  position: relative;
  margin-bottom: 0;
  clear: both;
  width: 100%;
}

.sub-links ul {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(3, 1fr);
  text-align: center;
}
.logo {
  grid-gap: 20px;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: 20px;
  margin-left: 70px;
}
.link {
  padding: 50px;
}

.sub-links ul {
  color: grey;
  list-style: none;
  padding: 0;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(4, 1fr);
}

.sub-links a {
  color: grey;
  text-decoration: none;
}
.logo a {
  color: grey;
}

.sub-links a:hover {
  color: grey;
  text-decoration: underline;
}

.logos a {
  padding: 10px;
}

.footers {
  padding: 20px;
  text-align: center;
  color: grey;
  margin: 10px;
}
</style>