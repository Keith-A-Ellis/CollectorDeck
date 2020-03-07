const renderSections = (data) => {
  data.forEach(section => {
    document.querySelector('#root').insertAdjacentHTML('beforeEnd', addSection(section.title, section.sectionID));
  }); 
};

const addSection = (sectionTitle, sectionID) => {
  return `
    <section>
      <h1>${sectionTitle}</h1>
      <div  class="card-group"  id='${sectionID}'>
      </div>
    </section>`;
};

module.exports = renderSections;
