import { LitElement, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

const listItems: string[] = ['Banana 🍌', 'Strawberrie 🍓', 'Apple 🍎', 'Grapes 🍇'];

@customElement('dropdown-element')
export class Dropdown extends LitElement {
  static styles = css`
    .dropdownWrapper {
      position: relative;
    }

    .dropdownButton {
      background: #333333;
      padding: 15px 20px;
      border: none;
      cursor: pointer;
      font-weight: 700;
      transition: 0.1s linear;

      &:hover {
        background: #636363;
      }

      &::after {
        content: "";
        display: inline-block;
        margin-left: 10px;
        vertical-align: 2.7px;
        border-top: 5px solid;
        border-right: 5px solid transparent;
        border-bottom: 0;
        border-left: 5px solid transparent;
      }
    }

    .dropdownList {
      display: none;
      position: absolute;
      right: calc(-110% - 5px);
      top: 0;
      width: 110%;
      margin: 0;
      padding: 0;
      list-style: none;
      
      
      &.visible {
        display: block;
      }
    }
    
    .dropdownWrapper.left{
      .dropdownList {
        right: calc(100% + 5px);
      }
    }

    .item {
      background: white;
      color: #55B074;
      padding: 7px 10px;
      transition: 0.1s linear;
      font-weight: 700;

      &:hover {
        background: #f0f0f0;
        cursor: pointer;
      }
      
      &.active {
        background: #f0f0f0;
      }
    }

    .selectedFruit {
      margin-top: 10px;
      text-align: center;
    }

  `;

  @property() renderSide: string = '';

  @state() selection: string = '';
  @state() isVisible: boolean = false;

  constructor() {
    super();
    addEventListener('click', this.handleDocumentClick);
  };

  private toggleDropdownVisibility() {
    this.isVisible = !this.isVisible
  };

  private handleItemClick(e: MouseEvent) {
    this.selection = (e.target as HTMLElement).innerText;
    this.toggleDropdownVisibility();
  };

  private handleDropdownClick() {
    this.toggleDropdownVisibility();
  };

  private isItemActive(item: string) {
    return item === this.selection;
  };

  handleDocumentClick = (e: MouseEvent) => {
    const targetNode = e.target as Node;
    
    if (!this.contains(targetNode)) {
      this.isVisible = false;
    }
  };

  renderItems() {
    return listItems.map(item => html`<li class='item ${this.isItemActive(item) ? 'active' : null}'>${item}</li>`);
  };
  
  render() {
    return html`
      <div class='dropdownWrapper ${this.renderSide}'>
        <button class='dropdownButton' @click=${this.handleDropdownClick} part='button'>Select fruit</button>
        <ul class='dropdownList ${this.isVisible ? 'visible' : null}' @click=${this.handleItemClick}>
          ${this.renderItems()}
        </ul>
      </div>
      ${this.selection && html`<div class="selectedFruit">${this.selection}</div>`}
    `
  };
};

declare global {
  interface HTMLElementTagNameMap {
    'dropdown-element': Dropdown
  }
};
