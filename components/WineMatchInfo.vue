<template>
    <div class="match-result">
      <div class="result-header">Passt zu {{ wine.rating }} %
        <div class="matched">
          <span class="label" id="">Matched:</span>
          {{ wine.matchedAttributes.join(', ') }}
        </div>
      </div>
      <div class="result-content">
        <div class="other-properties">
          <span class="label">Weitere Eigenschaften:</span>
          {{
            wine.profile.filter(attr => !wine.matchedAttributes.includes(attr)).join(', ')
          }}
        </div>
      </div>
    </div>
</template>
  
  <script>
  export default {
    props: {
      wine: {
        type: Object,
        required: true
      }
    }
  };
  </script>
  
  <style>
  .match-result {
    display: flex;
    flex-direction: column;
    background-color: whitesmoke;
    font-size: 14px;
    line-height: 1.4;
  }
  
  .result-header{
    font-weight: bold;
    font-size: 16px;
    color: black; 
    background-color: #f1c40f;
    padding: 10px;
  }
  
  .result-content {
    display: flex;
    flex-direction: column;
    color: black;
    padding: 5px;
  }
  
  .other-properties {
  
  }
  
  .label {
    font-weight: bold;
    margin-right: 0.5rem;
  }

  #matched {
    color: #f1c40f;
  }

  .matched {
    font-weight: bold;
  }
  
  /* Responsive-Design für kleinere Bildschirme */
  @media (max-width: 480px) {
    .match-result {
      font-size: 12px;
    }
  }
</style>

  