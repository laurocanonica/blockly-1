class FieldDropdownWithSearch extends Blockly.FieldDropdown {
    constructor(options) {
        super(options);
        this.searchInput = null;
        this.dropdownDiv = null;
    }

    showEditor_() {
        super.showEditor_();

        // 📱 MOBILE → do nothing extra (no search)
        if (Blockly.utils.userAgent.MOBILE) {
            return;
        }

        // 💻 DESKTOP → add search
        this.dropdownDiv = Blockly.DropDownDiv.getContentDiv();

        this.searchInput = document.createElement('input');
        this.searchInput.setAttribute('type', 'text');
        this.searchInput.setAttribute('placeholder', '🔎...');
        this.searchInput.style.width = '95%';
        this.searchInput.style.marginBottom = '5px';

        this.dropdownDiv.insertBefore(
            this.searchInput,
            this.dropdownDiv.firstChild
        );

        this.searchInput.addEventListener('input', (e) => {
            this.filterOptions(e.target.value);
        });

        // Focus only on desktop
        setTimeout(() => {
            this.searchInput.focus();
        }, 100);
    }

    filterOptions(query) {
        const normalizedQuery = query.toLowerCase();

        const filteredOptions = this.getOptions(true)
            .filter(option =>
                option[0].toLowerCase().includes(normalizedQuery)
            );

        const contentDiv = Blockly.DropDownDiv.getContentDiv();

        contentDiv.innerHTML = '';
        contentDiv.appendChild(this.searchInput);

        filteredOptions.forEach((option) => {
            const optionDiv = document.createElement('div');
            optionDiv.innerText = option[0];
            optionDiv.className = 'blocklyDropdownMenuItem';
            optionDiv.style.padding = '5px';

            optionDiv.addEventListener('click', () => {
                this.setValue(option[1]);
                Blockly.DropDownDiv.hideIfOwner(this);
            });

            contentDiv.appendChild(optionDiv);
        });

        setTimeout(() => {
            this.searchInput.focus();
        }, 100);
    }
}