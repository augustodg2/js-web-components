const template = document.createElement('template')
template.innerHTML = `
  <style>
    .user-card  {
      display: flex;
      padding: 2rem 1.5rem 2rem 1.5rem;
      font-family: 'Open Sans';
      margin-bottom: 1.5rem;
      border-radius: 1rem;
      box-shadow: 0 0 5px rgba(0,0,0,0.1);
    }
    .user-card img {
      max-width: 75px;
      max-height: 75px;
      margin-right: 1rem;
      border-radius: 50%;
    }
    .user-card .card-body h3 {
      margin-top: 0;
    }
    .user-card .card-body button {
      background: darkorchid;
      padding: .5rem 1rem .5rem 1rem;
      color: #FFFFFF;
      border: none;
      border-radius: .5rem
    }
    .user-card .card-body .info {
      display: none;
    }
  </style>

  <div class="user-card">
    <div class="avatar">
      <img alt="" />
    </div>
    <div class="card-body">
      <h3></h3>
      <div class="info">
        <p><slot name="email" /></p>
        <p><slot name="phone" /></p>
      </div>
      <button id="toggle-info">Show info</button>
    </div>
  </div>
`

class UserCard extends HTMLElement {
  constructor () {
    super()

    this.showInfo = false

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    this.shadowRoot.querySelector('.card-body h3').innerHTML = this.getAttribute('name')
    this.shadowRoot.querySelector('.avatar img').src = this.getAttribute('avatar')
  }

  toggleInfo () {
    this.showInfo = !this.showInfo
    const info = this.shadowRoot.querySelector('.info')
    const toggleInfoButton = this.shadowRoot.querySelector('#toggle-info')

    info.style.display = this.showInfo ? 'block' : 'none'
    toggleInfoButton.innerText = this.showInfo ? 'Hide info' : 'Show info'
  }

  connectedCallback () {
    this.shadowRoot.querySelector('#toggle-info').addEventListener('click', () => this.toggleInfo())
  }

  disconnectedCallback () {
    this.shadowRoot.querySelector('#toggle-info').removeEventListener()
  }
}

window.customElements.define('user-card', UserCard)
