function dictionaryPage() {//TODO finally add more wordclasses to type1/type2. not only verbs & nouns :sob:
    // /\(/o.o\)/\ - Spooky the spider

    let searchBTN = document.getElementById('search_button');
    let searchFLD = document.getElementById('search_field');

    // main search function
    function search(word) {
        searchBTN = document.getElementById('search_button');
        searchFLD = document.getElementById('search_field');

        let keyword = ((searchFLD && searchFLD.value ? searchFLD.value.trim() : '').toLowerCase()) || word;


        // for type2
        //let prefixData = [];
        //let suffixData = [];
        let verbSuffixData = [];
        let verbPrefixData = [];
        let nounSuffixData = [];
        let ppPrefixData = [];


        function bkjlcdfkjbacsfksjbsdkabjc() {
            /*  
                æze-
                aze-
                fenlly-
                ħá-
                ħáŋ-
                ho-
                hu-
                huz-
                kxā-
                kxæ-
                lleŋ-
                lloq̇-
                ly-
                ō-
                qa-
                qē-
                qēru-
                q̇ū-
                qχok-
                sæχ-
                saχ-
                sī-
                sil-
                thū-
                tre-
                ū-
                all prepositions^^
                        
                        
                i- prefix to turn nouns into adjectives
                -nyl to turn adjectives into adverbs
                -ûl
                -ūn
                -ān
                -ōn
                particles^^
                        
                -hyn	
                -hyf	
                -ħó	
                -llīl	
                -huχ	
                -thok	
                -hoq̇
                ^^ unique determiner suffixes. (only for determiners).
                        
                noun suffixes
                        
                verb prefixes
                verb suffixes
                        
                i think this is it.^^
                        
                raw exact match
            */
        }//HAHAHAHHAHAHAHAHHA. FUCK YOU COMMENT >:) :q

        //clear searchFLD
        if (searchFLD && searchFLD.value.trim() !== '') {
            searchFLD.value = '';
            searchFLD.blur();
        }

        helperFunctions.standard.clearPageById('page97'); //type 1
        helperFunctions.standard.clearPageById('page96'); //type 2
        helperFunctions.standard.clearPageById('dictionaryTable'); //type 3

        if (ALL_WORDS.fetch(keyword) && ALL_WORDS.fetch(keyword).length > 0) {//type 1
            console.log('-----type1-----');
            const searchHandler = ALL_WORDS.fetch(keyword);
            console.log('searchHandler |', searchHandler);
            searchHandler.forEach(entry => { // what for is this search handler 
                const word = entry.word
                let wordclass = entry.type || '...';

                // fix for case 'i'
                if (keyword === 'i') {
                    wordclass = 'part';
                }

                switch (wordclass) {
                    case 'adj':
                        console.log(wordclass);

                        if (word === keyword) {
                            console.log('clean match |', keyword);


                            helperFunctions.matchtype1.page97Base(keyword, wordclass);

                            const tableSearchable = document.getElementById('tableSearchBtn');


                            // Wait for the page content to load, then setup the table (header table)
                            helperFunctions.tablegen.waitForElement(`#page97 .tablesContainer`).then(pageContainer => {
                                // Create and fill the table
                                //console.log(NOUNS.SUFFIXES.MAP);
                                //const table = createTable(keyword, pageContainer);//just copy english table logic??
                                //console.log(wordclass);
                                //fillTable(keyword, wordclass, table);
                                function newFillTable(row, word, declension, definition, forms, usage_notes, type) {
                                    if (!row) return;

                                    const cells = row.querySelectorAll('td');
                                    const getCell = index => cells[index] || null;


                                    const adjcell0 = getCell(0);
                                    const adjcell1 = getCell(1);
                                    const adjcell2 = getCell(2);
                                    const adjcell3 = getCell(3);
                                    const adjcell4 = getCell(4);
                                    const adjcell5 = getCell(5);

                                    if (adjcell0) adjcell0.innerHTML = word || '...';
                                    if (adjcell1) adjcell1.innerHTML = declension || '...';
                                    if (adjcell2) adjcell2.innerHTML = definition || '...';
                                    if (adjcell3) adjcell3.innerHTML = forms || '...';
                                    if (adjcell4) adjcell4.innerHTML = usage_notes || '...';
                                    if (adjcell5) adjcell5.innerHTML = type || '...';

                                }
                                let gndr = '';
                                GENDERS.FLAT.NAME.forEach(gender => {
                                    gndr = gender + gndr;
                                });
                                const row = helperFunctions.matchtype1.type1extraTableRow(
                                    entry.word || '...',
                                    entry.declension || '...',
                                    gndr || '...',
                                    entry.definition || '...',
                                    entry.usage_notes || '...'); //console.log(gndr);//all adjectives take all genders - so no reason to include them in the header table.
                                newFillTable(row, entry.word, entry.declension, entry.definition, entry.forms, entry.usage_notes, entry.type);

                                const ADJwrapper = document.getElementById('leftleftdivdictionary');
                                helperFunctions.matchtype1.neoAdjectiveTables(entry.declension, 1, ADJwrapper);
                                helperFunctions.matchtype1.neoAdjectiveTables(entry.declension, 2, ADJwrapper);

                                //const dirTable = document.getElementById('Noun-Table-Directive');
                                //const recTable = document.getElementById('Noun-Table-Recessive');
                                helperFunctions.tablegen.populateSummaryTables(keyword, { 'Adjective-Table-Directive': false, 'Adjective-Table-Recessive': false });

                                tableSearchable.addEventListener('click', () => {
                                    console.log(wordclass);
                                    searchableTable(wordclass);
                                });
                            });
                        }
                        break;
                    case 'adv':
                        console.log(wordclass);
                        if (word === keyword) {
                            console.log('clean match |', keyword);


                            helperFunctions.matchtype1.page97Base(keyword, wordclass);

                            // Wait for the page content to load, then setup the table (header table)
                            helperFunctions.tablegen.waitForElement(`#page97 .tablesContainer`).then(pageContainer => {
                                const ADVwrapper = document.getElementById('leftleftdivdictionary');
                                const ADVheaderwrapper = document.querySelector('.tablesContainer'); console.log(entry);
                                helperFunctions.matchtype1.neoAdverbTables(ADVheaderwrapper, keyword, entry.definition, entry.forms, entry.usage_notes, wordclass);
                            });
                        }

                        break;
                    case 'aux':
                        console.log(wordclass);
                        if (word === keyword) {
                            console.log('clean match |', keyword);


                            helperFunctions.matchtype1.page97Base(keyword, wordclass);

                            const tableSearchable = document.getElementById('tableSearchBtn');


                            // Wait for the page content to load, then setup the table (header table)
                            helperFunctions.tablegen.waitForElement(`#page97 .tablesContainer`).then(pageContainer => {
                                const Headerhtml = `
                                <div>
                                    <table>
                                        <tr>
                                            <th style="width:116px">Word</th>
                                            <th>Definition</th>
                                            <th>Forms</th>
                                            <th>Usage Notes</th>
                                            <th>Wordclass</th>
                                        </tr>
                                        <tr>
                                            <td>${entry.word || '...'}</td>
                                            <td>${entry.definition || '...'}</td>
                                            <td>${entry.forms || '...'}</td>
                                            <td>${entry.usage_notes || '...'}</td>
                                            <td>${wordclass}</td>
                                        </tr>
                                    </table>
                                </div>
                                `;
                                helperFunctions.standard.createDivById('', pageContainer, Headerhtml);



                                const AUXwrapper = document.getElementById('leftleftdivdictionary');
                                helperFunctions.matchtype1.neoVerbTables(1, keyword, AUXwrapper);
                                helperFunctions.tablegen.populateSummaryTables(keyword, { 'Verb-Table-Prefix': true, 'Verb-Table-Suffix': false });

                                tableSearchable.addEventListener('click', () => {
                                    console.log(wordclass);
                                    searchableTable('v');
                                });
                            });
                        }
                        break;
                    case 'con':
                        console.log(wordclass);
                        if (word === keyword) {
                            const html = `
                                <div class="outerdiv">
                                    <div id="leftdivdictionary" class="leftdivdictionary">
                                        <div class="keyworddiv"></div>
                                        <h2>
                                            ${keyword}
                                        </h2>
                                        <p>${keyword} is a ${wordclass} Read more about ${wordclass}s <a href="#"
                                            onclick="event.preventDefault(); dictionaryPageReference()">here</a>,
                                        or read the short outline in here.</p>
                                        <br><br>
                                        <p>The declention tables that would be relevant for ${keyword} can be seen bellow.</p>

                                        <div class="tablesContainer"></div>

                                        <div id="includeTarget">
                                            <div id="leftleftdivdictionary"></div>
                                            <div id="rightleftdivdictionary"></div>
                                        </div>
                                    </div>
                                    <div id="rightdivdictionary" class="rightdivdictionary">
                                        <div class="pageSearch">
                                            <input type="text" id="unusedField" placeholder="Search..." />
                                            <button id="unusedBtn">Search</button>
                                            <button id="tableSearchBtn">Table is seachable</button>
                                            <div id="textBoxContainer"></div>
                                        </div>
                                    </div>
                                </div>`;
                            helperFunctions.standard.createPageById('page97', html);
                            helperFunctions.tablegen.waitForElement(`#page97 .tablesContainer`).then(pageContainer => {
                                const html = `
                            <div>
                                <table>
                                    <tr>
                                        <th style="width:116px">Word</th>
                                        <th>Definition</th>
                                        <th>Usage Notes</th>
                                        <th>Wordclass</th>
                                    </tr>
                                    <tr>
                                        <td>${entry.word || '...'}</td>
                                        <td>${entry.definition || '...'}</td>
                                        <td>${entry.usage_notes || '...'}</td>
                                        <td>${wordclass}</td>
                                    </tr>
                                </table>
                            </div>
                            `;
                                helperFunctions.standard.createDivById('', pageContainer, html);
                            });
                        }
                        break;
                    case 'det':
                        console.log(wordclass);

                        break;
                    case 'n':
                        console.log(wordclass);
                        const NcombinedGendersObject = WORD_UTILS.combineGenders(entry.genders) // Key-value pairs
                        if (word === keyword) {
                            console.log('clean match |', keyword);

                            helperFunctions.matchtype1.page97Base(keyword, wordclass);

                            const tableSearchable = document.getElementById('tableSearchBtn');


                            // Wait for the page content to load, then setup the table (header table)
                            helperFunctions.tablegen.waitForElement(`#page97 .tablesContainer`).then(pageContainer => {
                                // Create and fill the table
                                //console.log(NOUNS.SUFFIXES.MAP);
                                //const table = createTable(keyword, pageContainer);//just copy english table logic??
                                //console.log(wordclass);
                                //fillTable(keyword, wordclass, table);
                                function newFillTable(row, word, declension, definition, forms, usage_notes, type) {
                                    if (!row) return;

                                    const cells = row.querySelectorAll('td');
                                    const getCell = index => cells[index] || null;


                                    const ncell0 = getCell(0);
                                    const ncell1 = getCell(1);
                                    const ncell2 = getCell(2);
                                    const ncell3 = getCell(3);
                                    const ncell4 = getCell(4);
                                    const ncell5 = getCell(5);

                                    if (ncell0) ncell0.innerHTML = word || '...';
                                    if (ncell1) ncell1.innerHTML = declension || '...';
                                    if (ncell2) ncell2.innerHTML = definition || '...';
                                    if (ncell3) ncell3.innerHTML = forms || '...';
                                    if (ncell4) ncell4.innerHTML = usage_notes || '...';
                                    if (ncell5) ncell5.innerHTML = type || '...';

                                }
                                for (const [gender, def] of Object.entries(NcombinedGendersObject)) {
                                    const row = helperFunctions.matchtype1.type1extraTableRow(
                                        entry.word || '...',
                                        entry.declension || '...',
                                        gender || '...',
                                        def || '...',
                                        entry.usage_notes || '...')
                                    newFillTable(row, entry.word, entry.declension, def, gender, entry.usage_notes, entry.type);
                                }
                                const Nwrapper = document.getElementById('leftleftdivdictionary');
                                helperFunctions.matchtype1.neoNounTables(entry.declension, 1, Nwrapper, NcombinedGendersObject);
                                helperFunctions.matchtype1.neoNounTables(entry.declension, 2, Nwrapper, NcombinedGendersObject);

                                //const dirTable = document.getElementById('Noun-Table-Directive');
                                //const recTable = document.getElementById('Noun-Table-Recessive');
                                helperFunctions.tablegen.populateSummaryTables(keyword, { 'Noun-Table-Directive': false, 'Noun-Table-Recessive': false });

                                tableSearchable.addEventListener('click', () => {
                                    console.log(wordclass);
                                    searchableTable(wordclass);
                                });
                            });
                        }
                        break;
                    case 'part':
                        console.log(wordclass);
                        if (word === keyword) {
                            const html = `
                                <div class="outerdiv">
                                    <div id="leftdivdictionary" class="leftdivdictionary">
                                        <div class="keyworddiv"></div>
                                        <h2>
                                            ${keyword}
                                        </h2>
                                        <p>${keyword} is a ${wordclass} Read more about ${wordclass}s <a href="#"
                                            onclick="event.preventDefault(); dictionaryPageReference()">here</a>,
                                        or read the short outline in here.</p>
                                        <br><br>
                                        <p>The declention tables that would be relevant for ${keyword} can be seen bellow.</p>

                                        <div class="tablesContainer"></div>

                                        <div id="includeTarget">
                                            <div id="leftleftdivdictionary"></div>
                                            <div id="rightleftdivdictionary"></div>
                                        </div>
                                    </div>
                                    <div id="rightdivdictionary" class="rightdivdictionary">
                                        <div class="pageSearch">
                                            <input type="text" id="unusedField" placeholder="Search..." />
                                            <button id="unusedBtn">Search</button>
                                            <button id="tableSearchBtn">Table is seachable</button>
                                            <div id="textBoxContainer"></div>
                                        </div>
                                    </div>
                                </div>`;
                            helperFunctions.standard.createPageById('page97', html);
                            helperFunctions.tablegen.waitForElement(`#page97 .tablesContainer`).then(pageContainer => {
                                const html = `
                            <div>
                                <table>
                                    <tr>
                                        <th style="width:116px">Word</th>
                                        <th>Definition</th>
                                        <th>Usage Notes</th>
                                        <th>Wordclass</th>
                                    </tr>
                                    <tr>
                                        <td>${entry.word || '...'}</td>
                                        <td>${entry.definition || '...'}</td>
                                        <td>${entry.usage_notes || '...'}</td>
                                        <td>${wordclass}</td>
                                    </tr>
                                </table>
                            </div>
                            `;
                                helperFunctions.standard.createDivById('', pageContainer, html);
                            });
                        }
                        break;
                    case 'pn':
                        console.log(wordclass);

                        break;
                    case 'pp':
                        console.log(wordclass);
                        if (word === keyword) {

                            helperFunctions.matchtype1.page97Base(keyword, wordclass);
                            helperFunctions.tablegen.waitForElement(`#page97 .tablesContainer`).then(pageContainer => {
                                const html = `
                            <div>
                                <table>
                                    <tr>
                                        <th style="width:116px">Word</th>
                                        <th>Definition</th>
                                        <th>Usage Notes</th>
                                        <th>Wordclass</th>
                                    </tr>
                                    <tr>
                                        <td>${entry.word || '...'}</td>
                                        <td>${entry.definition || '...'}</td>
                                        <td>${entry.usage_notes || '...'}</td>
                                        <td>${wordclass}</td>
                                    </tr>
                                </table>
                            </div>
                            `;
                                helperFunctions.standard.createDivById('', pageContainer, html);
                            });
                        }
                        break;
                    case 'v':
                        console.log(wordclass);
                        if (word === keyword) {
                            console.log('clean match |', keyword);

                            const html = `
                                <div class="outerdiv">
                                    <div id="leftdivdictionary" class="leftdivdictionary">
                                        <div class="keyworddiv"></div>
                                        <h2>
                                            ${keyword}
                                        </h2>
                                        <p>${keyword} is a ${wordclass} Read more about ${wordclass}s <a href="#"
                                            onclick="event.preventDefault(); dictionaryPageReference()">here</a>,
                                        or read the short outline in here.</p>
                                        <br><br>
                                        <p>The declention tables that would be relevant for ${keyword} can be seen bellow.</p>

                                        <div class="tablesContainer"></div>

                                        <div id="includeTarget">
                                            <div id="leftleftdivdictionary"></div>
                                            <div id="rightleftdivdictionary"></div>
                                        </div>
                                    </div>
                                    <div id="rightdivdictionary" class="rightdivdictionary">
                                        <div class="pageSearch">
                                            <input type="text" id="unusedField" placeholder="Search..." />
                                            <button id="unusedBtn">Search</button>
                                            <button id="tableSearchBtn">Table is seachable</button>
                                            <div id="textBoxContainer"></div>
                                        </div>
                                    </div>
                                </div>`;
                            helperFunctions.standard.createPageById('page97', html);

                            const tableSearchable = document.getElementById('tableSearchBtn');


                            // Wait for the page content to load, then setup the table (header table)
                            helperFunctions.tablegen.waitForElement(`#page97 .tablesContainer`).then(pageContainer => {
                                // Create and fill the table
                                //console.log(NOUNS.SUFFIXES.MAP);
                                //const table = createTable(keyword, pageContainer);//just copy english table logic??
                                //console.log(wordclass);
                                //fillTable(keyword, wordclass, table);
                                function newFillTable(row, word, declension, definition, forms, usage_notes, type) {
                                    if (!row) return;

                                    const cells = row.querySelectorAll('td');
                                    const getCell = index => cells[index] || null;


                                    const vcell0 = getCell(0);
                                    const vcell1 = getCell(1);
                                    const vcell2 = getCell(2);
                                    const vcell3 = getCell(3);
                                    const vcell4 = getCell(4);
                                    const vcell5 = getCell(5);

                                    if (vcell0) vcell0.innerHTML = word || '...';
                                    if (vcell1) vcell1.innerHTML = declension || '...';
                                    if (vcell2) vcell2.innerHTML = definition || '...';
                                    if (vcell3) vcell3.innerHTML = forms || '...';
                                    if (vcell4) vcell4.innerHTML = usage_notes || '...';
                                    if (vcell5) vcell5.innerHTML = type || '...';

                                }

                                const row = helperFunctions.matchtype1.type1extraTableRow(
                                    entry.word || '...',
                                    entry.declension || '...',
                                    entry.forms || '...',
                                    entry.definition || '...',
                                    entry.usage_notes || '...')
                                newFillTable(row, entry.word, entry.declension, entry.definition, entry.forms, entry.usage_notes, entry.type);
                                const Vwrapper = document.getElementById('leftleftdivdictionary');
                                helperFunctions.matchtype1.neoVerbTables(1, keyword, Vwrapper);
                                helperFunctions.matchtype1.neoVerbTables(2, keyword, Vwrapper);

                                helperFunctions.tablegen.populateSummaryTables(keyword, { 'Verb-Table-Prefix': true, 'Verb-Table-Suffix': false });

                                tableSearchable.addEventListener('click', () => {
                                    console.log(wordclass);
                                    searchableTable(wordclass);
                                });
                            });
                        }
                        break;
                    default: console.warn(`${wordclass} is an invalid wordclass`);
                        break;

                }
                openPageOld('page97')
            });
        }
        else if (

            helperFunctions.matchtype2.affixChecker(keyword, VERBS.PREFIXES.FLAT_MATCHES, true, true, verbPrefixData) ||
            helperFunctions.matchtype2.affixChecker(keyword, PREPOSITIONS.MAP, true, true, ppPrefixData) ||
            helperFunctions.matchtype2.affixChecker(keyword, VERBS.SUFFIXES.FLAT_MATCHES, false, true, verbSuffixData) ||
            helperFunctions.matchtype2.affixChecker(keyword, NOUNS.SUFFIXES.FLAT_MATCHES, false, true, nounSuffixData)


        ) {//type 2
            console.log('-----type2-----');
            console.log(verbSuffixData);
            let hasVerbPrefix = (verbPrefixData[0] ? true : false);//get from array.type instead? need to know which affix it is though.
            let hasVerbSuffix = (verbSuffixData[0] ? true : false);
            let hasNounSuffix = (nounSuffixData[0] ? true : false);
            let hasPpPrefix = (ppPrefixData[0] ? true : false);

            //add to EVERY if statements beginning, a check if the stem exists - to fix type3
            if (hasVerbPrefix) {
                console.log('has verb prefix');
                console.log(verbPrefixData);

                const array = verbPrefixData[0];
                const prefixGender = array.affixGender;
                const prefixNumber = array.affixNumber;
                const prefixPerson = array.affixPerson;
                const prefix = array.affix;
                const prefixStem = array.affixStem;
                const prefixKeyword = keyword;
                const prefixType = array.affixType;

                const stemMap = ALL_WORDS.MAP[prefixStem] || [];
                const stemDifinition = stemMap.definition || '...';
                const stemNotes = stemMap.usage_notes || '...';


                let wordclass = '';
                for (const key of Object.values(WORDCLASSES)) {
                    if (key.SHORT === prefixType) { wordclass = key.NAME }
                }; //console.log(wordclass);

                const Phtml = `
                                <div>
                                    <table>
                                        <tr>
                                            <th style="width:116px">...</th>
                                            <th>Word</th>
                                            <th>Stem</th>
                                            <th>Wordclass</th>
                                            <th>Definition</th>
                                            <th>Usage Notes</th>
                                        </tr>
                                        <tr>
                                            <th>Info</th>
                                            <td>${prefixKeyword}</td>
                                            <td id="type2PrefixONLYStem">${prefixStem}</td>
                                            <td>${wordclass}</td>
                                            <td>${stemDifinition}</td>
                                            <td>${stemNotes || '...'}</td>
                                        </tr>
                                    </table>
                                    <br>
                                    <table>
                                        <tr>
                                            <th style="width:116px">...</th>
                                            <th>Prefix</th>
                                            <th>Gender</th>
                                            <th>Number</th>
                                            <th>Person</th>
                                        </tr>
                                        <tr>
                                            <th>Prefix</th>
                                            <td>${prefix}</td>
                                            <td>${prefixGender}</td>
                                            <td>${prefixNumber}</td>
                                            <td>${prefixPerson}</td>
                                        </tr>
                                    </table>
                                </div>
                                <br>
                                <div id="prefixONLYSuffixtable">
                                </div>`;

                helperFunctions.standard.createPageById('page96', Phtml);

                const stemPTd = document.querySelector('#type2PrefixONLYStem');
                if (stemPTd) {
                    stemPTd.style.cursor = 'pointer';
                    stemPTd.addEventListener('click', () => {
                        search(prefixStem);
                    });
                }

                const prefixONLYSuffixtableWrapper = document.getElementById('prefixONLYSuffixtable');
                if (prefixONLYSuffixtableWrapper) {
                    helperFunctions.matchtype1.neoVerbTables(2, keyword, prefixONLYSuffixtableWrapper);

                    helperFunctions.tablegen.populateSummaryTables(prefixKeyword, { 'Verb-Table-Prefix': true, 'Verb-Table-Suffix': false });
                }
                //console.log(prefixData, suffixData);

                if (helperFunctions.matchtype2.affixChecker(prefixStem, VERBS.SUFFIXES.FLAT_MATCHES, false, true, verbSuffixData)) {
                    //console.log(prefixData, suffixData);
                    if (verbSuffixData[0]) {
                        const array = verbSuffixData[0];
                        const suffixGender = array.affixGender;
                        const suffixNumber = array.affixNumber;
                        const suffixPerson = array.affixPerson;
                        const suffixType = array.affixType;
                        const suffix = array.affix;
                        const suffixStem = array.affixStem;

                        console.log(
                            suffixGender,
                            suffixNumber,
                            suffixPerson,
                            suffixType,
                            suffix,
                            suffixStem
                        );

                        if (ALL_WORDS.MAP[suffixStem]) {
                            hasVerbSuffix = true;
                            const stemMap = ALL_WORDS.MAP[suffixStem] || [];
                            const stemDifinition = stemMap.definition || '...';
                            const stemNotes = stemMap.usage_notes || '...';

                            console.log(suffixType);

                            let wordclass = '';
                            for (const key of Object.values(WORDCLASSES)) {
                                if (key.SHORT === suffixType) { wordclass = key.NAME }
                            }; //console.log(wordclass);

                            if (suffixType === 'n' || suffixType === 'adj') {
                                console.log('hello world')
                            } else {
                                const PShtml = `
                                                <div>
                                                    <table>
                                                        <tr>
                                                            <th style="width:116px">...</th>
                                                            <th>Word</th>
                                                            <th>Stem</th>
                                                            <th>Wordclass</th>
                                                            <th>Definition</th>
                                                            <th>Usage Notes</th>
                                                        </tr>
                                                        <tr>
                                                            <th>Info</th>
                                                            <td>${keyword}</td>
                                                            <td id="type2SuffixBOTHStem">${suffixStem}</td>
                                                            <td>${wordclass}</td>
                                                            <td>${stemDifinition}</td>
                                                            <td>${stemNotes || '...'}</td>
                                                        </tr>
                                                    </table>
                                                    <br>
                                                    <table>
                                                        <tr>
                                                            <th style="width:116px">...</th>
                                                            <th>Affix</th>
                                                            <th>Gender</th>
                                                            <th>Number</th>
                                                            <th>Person</th>
                                                        </tr>
                                                        <tr>
                                                            <th>Prefix</th>
                                                            <td>${prefix}</td>
                                                            <td>${prefixGender}</td>
                                                            <td>${prefixNumber}</td>
                                                            <td>${prefixPerson}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Suffix</th>
                                                            <td>${suffix}</td>
                                                            <td>${suffixGender}</td>
                                                            <td>${suffixNumber}</td>
                                                            <td>${suffixPerson}</td>
                                                        </tr>
                                                    </table>
                                                </div>`;

                                //const wrapper = document.getElementById('page96');
                                //console.log(wrapper);
                                helperFunctions.standard.createPageById('page96', PShtml);

                                const stemPTd = document.querySelector('#type2PrefixBOTHStem');
                                if (stemPTd) {
                                    stemPTd.style.cursor = 'pointer';
                                    stemPTd.addEventListener('click', () => {
                                        keyword = suffixStem;
                                        search(keyword);
                                    });
                                }
                                const stemSTd = document.querySelector('#type2SuffixBOTHStem');
                                if (stemSTd) {
                                    stemSTd.style.cursor = 'pointer';
                                    stemSTd.addEventListener('click', () => {
                                        keyword = suffixStem;
                                        search(keyword);
                                    });
                                }
                            }
                        }
                    }
                }
            }
            if (hasVerbSuffix) {
                console.log('has verb suffix');

                if (verbSuffixData.length > 1) {
                    console.log('has multiple verb suffixes');


                    const stemMap = ALL_WORDS.MAP[verbSuffixData[0].affixStem] || [];
                    const stemDifinition = stemMap.definition || '...';
                    const stemNotes = stemMap.usage_notes || '...';



                    let wordclass = '';
                    for (const key of Object.values(WORDCLASSES)) {
                        if (key.SHORT === 'v') { wordclass = key.NAME }
                    }; //console.log(wordclass);

                    const html = `
                        <div>
                            <table>
                                <tr>
                                    <th style="width:116px">...</th>
                                    <th>Word</th>
                                    <th>Stem</th>
                                    <th>Wordclass</th>
                                    <th>Definition</th>
                                    <th>Usage Notes</th>
                                </tr>
                                <tr>
                                    <th>Info</th>
                                    <td>${keyword}</td>
                                    <td id="type2SuffixONLYStem">${verbSuffixData[0].affixStem}</td>
                                    <td>${wordclass}</td>
                                    <td>${stemDifinition}</td>
                                    <td>${stemNotes || '...'}</td>
                                </tr>
                            </table>
                        </div>
                        <br>
                        <div id="affixTablesContainer">
                            <table>
                                <thead>
                                    <tr>
                                        <th style="width:116px">...</th>
                                        <th>Suffix</th>
                                        <th>Gender</th>
                                        <th>Number</th>
                                        <th>Person</th>
                                    </tr>
                                </thead>
                                <tbody id="affixTablesTbody"></tbody>
                            </table>
                        </div>
                        <br>
                        <br>
                        <br>
                        <div id="suffixONLYPrefixtable"></div>
                    `;
                    helperFunctions.standard.createPageById('page96', html);
                    verbSuffixData.forEach(arr => {
                        console.log('arr | ', arr);


                        const suffixGender = arr.affixGender;
                        const suffixNumber = arr.affixNumber;
                        const suffixPerson = arr.affixPerson;
                        const suffix = arr.affix;
                        const suffixStem = arr.affixStem;


                        if (ALL_WORDS.MAP[suffixStem]) {
                            const PShtml = `
                                <tbody>
                                    <tr>
                                        <th>Suffix</th>
                                        <td>${suffix}</td>
                                        <td>${suffixGender}</td>
                                        <td>${suffixNumber}</td>
                                        <td>${suffixPerson}</td>
                                    </tr>
                                <tbody>
                            `;

                            helperFunctions.standard.insertTrIntoTableById('affixTablesTbody', PShtml);
                        }
                    });
                    const stemSTd = document.querySelector('#type2SuffixONLYStem');
                    if (stemSTd) {
                        stemSTd.style.cursor = 'pointer';
                        stemSTd.addEventListener('click', () => {
                            keyword = verbSuffixData[0].affixStem;
                            search(keyword);
                        });
                    }
                    const suffixONLYPrefixtableWrapper = document.getElementById('suffixONLYPrefixtable');
                    if (suffixONLYPrefixtableWrapper) {
                        helperFunctions.matchtype1.neoVerbTables(1, keyword, suffixONLYPrefixtableWrapper);

                        helperFunctions.tablegen.populateSummaryTables(keyword, { 'Verb-Table-Prefix': true, 'Verb-Table-Suffix': false });
                    }
                    openPageOld('page96');
                    return;
                } else { return; }//temp return.

                if (verbSuffixData[0]) {
                    const array = verbSuffixData[0];
                    const suffixGender = array.affixGender;
                    const suffixNumber = array.affixNumber;
                    const suffixPerson = array.affixPerson;
                    const suffixType = array.affixType;
                    const suffix = array.affix;
                    const suffixStem = array.affixStem;

                    console.log(
                        suffixGender,
                        suffixNumber,
                        suffixPerson,
                        suffixType,
                        suffix,
                        suffixStem
                    );

                    if (ALL_WORDS.MAP[suffixStem]) {
                        hasVerbSuffix = true;
                        const stemMap = ALL_WORDS.MAP[suffixStem] || [];
                        const stemDifinition = stemMap.definition || '...';
                        const stemNotes = stemMap.usage_notes || '...';

                        console.log(suffixType);

                        let wordclass = '';
                        for (const key of Object.values(WORDCLASSES)) {
                            if (key.SHORT === suffixType) { wordclass = key.NAME }
                        }; //console.log(wordclass);

                        if (suffixType === 'n' || suffixType === 'adj') {
                            console.log('hello world')
                        } else {
                            const PShtml = `
                                <div>
                                    <table>
                                        <tr>
                                            <th style="width:116px">...</th>
                                            <th>Word</th>
                                            <th>Stem</th>
                                            <th>Wordclass</th>
                                            <th>Definition</th>
                                            <th>Usage Notes</th>
                                        </tr>
                                        <tr>
                                            <th>Info</th>
                                            <td>${keyword}</td>
                                            <td id="type2SuffixONLYStem">${suffixStem}</td>
                                            <td>${wordclass}</td>
                                            <td>${stemDifinition}</td>
                                            <td>${stemNotes || '...'}</td>
                                        </tr>
                                    </table>
                                    <br>
                                    <table>
                                        <tr>
                                            <th style="width:116px">...</th>
                                            <th>Suffix</th>
                                            <th>Gender</th>
                                            <th>Number</th>
                                            <th>Person</th>
                                        </tr>
                                        <tr>
                                            <th>Suffix</th>
                                            <td>${suffix}</td>
                                            <td>${suffixGender}</td>
                                            <td>${suffixNumber}</td>
                                            <td>${suffixPerson}</td>
                                        </tr>
                                    </table>
                                </div>
                                <br>
                                <div id="suffixONLYPrefixtable">
                                </div>`;

                            //const wrapper = document.getElementById('page96');
                            //console.log(wrapper);
                            helperFunctions.standard.createPageById('page96', PShtml);

                            const stemSTd = document.querySelector('#type2SuffixONLYStem');
                            if (stemSTd) {
                                stemSTd.style.cursor = 'pointer';
                                stemSTd.addEventListener('click', () => {
                                    keyword = suffixStem;
                                    search(keyword);
                                });
                            }
                        }
                    }
                }
            }
            if (hasNounSuffix) {
                console.log('has noun suffix');
                const array = nounSuffixData[0]; console.log(array);
                const suffixDeclension = array.affixDeclension;
                const suffixGender = array.affixGender;
                const suffixNumber = array.affixNumber;
                const suffixCase = array.affixCase;
                const suffixType = array.affixType;
                const suffix = array.affix;
                const suffixStem = array.affixStem;

                const stemMap = ALL_WORDS.MAP[suffixStem] || []; console.log(stemMap);
                let stemDifinition = stemMap.definition || '...';
                const stemNotes = stemMap.usage_notes || '...';

                let wordclass = '';
                for (const key of Object.values(WORDCLASSES)) {
                    if (key.SHORT === suffixType) { wordclass = key.NAME }
                };




                const combinedGendersObject = WORD_UTILS.combineGenders(stemMap.genders) // Key-value pairs
                for (const [gndr, def] of Object.entries(combinedGendersObject)) {
                    if (gndr === suffixGender) {
                        stemDifinition = def;
                        console.log(combinedGendersObject);
                        console.log(gndr, def);

                        const SNhtml = `
                            <div>
                                <table>
                                    <tr>
                                        <th style="width:116px">...</th>
                                        <th>Word</th>
                                        <th>Stem</th>
                                        <th>Wordclass</th>
                                        <th>Case</th>
                                        <th>Usage Notes</th>
                                    </tr>
                                    <tr>
                                        <th>Info</th>
                                        <td>${keyword}</td>
                                        <td id="type2SuffixONLYStem">${suffixStem}</td>
                                        <td>${wordclass}</td>
                                        <td>${suffixCase}</td>
                                        <td>${stemNotes || '...'}</td>
                                    </tr>
                                </table>
                                <br>
                                <table>
                                    <tr>
                                        <th style="width:116px">...</th>
                                        <th>Suffix</th>
                                        <th>Declension</th>
                                        <th>Gender</th>
                                        <th>Number</th>
                                        <th>Definition</th>
                                    </tr>
                                    <tr>
                                        <th>Info</th>
                                        <td>${suffix}</td>
                                        <td>${suffixDeclension}</td>
                                        <td>${suffixGender}</td>
                                        <td>${suffixNumber}</td>
                                        <td>${stemDifinition}</td>
                                    </tr>
                                </table>
                            </div>
                            `;

                        helperFunctions.standard.createPageById('page96', SNhtml);

                        helperFunctions.standard.createPageById('page96', SNhtml);
                        const stemTd = document.querySelector('#type2SuffixONLYStem');
                        if (stemTd) {
                            stemTd.style.cursor = 'pointer';
                            stemTd.addEventListener('click', () => {
                                keyword = suffixStem;
                                search(keyword);
                            });

                        }
                    }
                }
            }
            if (hasPpPrefix) {
                console.log('has pp prefix');
            }

            /*
            
                        if (hasPrefix) {
                            console.log(prefixData);
            
                            const array = prefixData[0];
                            const prefixGender = array.affixGender;
                            const prefixNumber = array.affixNumber;
                            const prefixPerson = array.affixPerson;
                            const prefix = array.affix;
                            const prefixStem = array.affixStem;
                            const prefixKeyword = keyword;
                            const prefixType = array.affixType;
            
                            const stemMap = ALL_WORDS.MAP[prefixStem] || [];
                            const stemDifinition = stemMap.definition || '...';
                            const stemNotes = stemMap.usage_notes || '...';
            */
            /*console.log(
                prefixGender,
                prefixNumber,
                prefixPerson,
                prefix,
                array,
                prefixData[0],
                prefixStem
            );*/

            /*
                            let wordclass = '';
                            for (const key of Object.values(WORDCLASSES)) {
                                if (key.SHORT === prefixType) { wordclass = key.NAME }
                            }; //console.log(wordclass);
            
                            const Phtml = `
                                <div>
                                    <table>
                                        <tr>
                                            <th style="width:116px">...</th>
                                            <th>Word</th>
                                            <th>Stem</th>
                                            <th>Wordclass</th>
                                            <th>Definition</th>
                                            <th>Usage Notes</th>
                                        </tr>
                                        <tr>
                                            <th>Info</th>
                                            <td>${prefixKeyword}</td>
                                            <td id="type2PrefixONLYStem">${prefixStem}</td>
                                            <td>${wordclass}</td>
                                            <td>${stemDifinition}</td>
                                            <td>${stemNotes || '...'}</td>
                                        </tr>
                                    </table>
                                    <br>
                                    <table>
                                        <tr>
                                            <th style="width:116px">...</th>
                                            <th>Prefix</th>
                                            <th>Gender</th>
                                            <th>Number</th>
                                            <th>Person</th>
                                        </tr>
                                        <tr>
                                            <th>Prefix</th>
                                            <td>${prefix}</td>
                                            <td>${prefixGender}</td>
                                            <td>${prefixNumber}</td>
                                            <td>${prefixPerson}</td>
                                        </tr>
                                    </table>
                                </div>
                                <br>
                                <div id="prefixONLYSuffixtable">
                                </div>`;
            
                            helperFunctions.standard.createPageById('page96', Phtml);
            
                            const stemPTd = document.querySelector('#type2PrefixONLYStem');
                            if (stemPTd) {
                                stemPTd.style.cursor = 'pointer';
                                stemPTd.addEventListener('click', () => {
                                    search(prefixStem);
                                });
                            }
            
                            const prefixONLYSuffixtableWrapper = document.getElementById('prefixONLYSuffixtable');
                            if (prefixONLYSuffixtableWrapper) {
                                helperFunctions.matchtype1.neoVerbTables(2, keyword, prefixONLYSuffixtableWrapper);
            
                                helperFunctions.tablegen.populateSummaryTables(prefixKeyword, { 'Verb-Table-Prefix': true, 'Verb-Table-Suffix': false });
                            }
                            //console.log(prefixData, suffixData);
                            if (
                                (helperFunctions.matchtype2.affixChecker(prefixStem, VERBS.SUFFIXES.FLAT_MATCHES, false, true, suffixData) ||
                                    helperFunctions.matchtype2.affixChecker(prefixStem, NOUNS.SUFFIXES.FLAT_MATCHES, false, true, suffixData))
                            ) {
            
                                //console.log(prefixData, suffixData);
                                if (suffixData[0].length > 0) {
                                    const array = suffixData[0];
                                    const suffixDeclensions = array.Suffixdeclensions;
                                    for (declension of Object.values(suffixDeclensions)) {
                                        const suffixDeclension = declension;
                                        const suffixGender = array.Suffixgender;
                                        const suffixNumber = array.Suffixnumber;
                                        const suffixPerson = array.Suffixperson;
                                        const suffixType = array.Suffixtype;
                                        const suffix = array.usedSuffix;
                                        const suffixStem = array.Suffixstem;
            
                                        console.log(
                                            suffixDeclension,
                                            suffixGender,
                                            suffixNumber,
                                            suffixPerson,
                                            suffixType,
                                            suffix,
                                            suffixStem
                                        );
            
                                        if (ALL_WORDS.MAP[suffixStem]) {
                                            hasSuffix = true;
                                            const stemMap = ALL_WORDS.MAP[suffixStem] || [];
                                            const stemDifinition = stemMap.definition || '...';
                                            const stemNotes = stemMap.usage_notes || '...';
            
                                            console.log(suffixType);
            
                                            let wordclass = '';
                                            for (const key of Object.values(WORDCLASS)) {
                                                if (key.SHORT === suffixType) { wordclass = key.NAME }
                                            }; //console.log(wordclass);
            
                                            if (suffixType === 'n' || suffixType === 'adj') {
                                                console.log('hello world')
                                            } else {
                                                const PShtml = `
                                                <div>
                                                    <table>
                                                        <tr>
                                                            <th style="width:116px">...</th>
                                                            <th>Word</th>
                                                            <th>Stem</th>
                                                            <th>Wordclass</th>
                                                            <th>Definition</th>
                                                            <th>Usage Notes</th>
                                                        </tr>
                                                        <tr>
                                                            <th>Info</th>
                                                            <td>${keyword}</td>
                                                            <td id="type2SuffixBOTHStem">${suffixStem}</td>
                                                            <td>${wordclass}</td>
                                                            <td>${stemDifinition}</td>
                                                            <td>${stemNotes || '...'}</td>
                                                        </tr>
                                                    </table>
                                                    <br>
                                                    <table>
                                                        <tr>
                                                            <th style="width:116px">...</th>
                                                            <th>Affix</th>
                                                            <th>Gender</th>
                                                            <th>Number</th>
                                                            <th>Person</th>
                                                        </tr>
                                                        <tr>
                                                            <th>Prefix</th>
                                                            <td>${prefix}</td>
                                                            <td>${prefixGender}</td>
                                                            <td>${prefixNumber}</td>
                                                            <td>${prefixPerson}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Suffix</th>
                                                            <td>${suffix}</td>
                                                            <td>${suffixGender}</td>
                                                            <td>${suffixNumber}</td>
                                                            <td>${suffixPerson}</td>
                                                        </tr>
                                                    </table>
                                                </div>`;
            
                                                //const wrapper = document.getElementById('page96');
                                                //console.log(wrapper);
                                                helperFunctions.standard.createPageById('page96', PShtml);
            
                                                const stemPTd = document.querySelector('#type2PrefixBOTHStem');
                                                if (stemPTd) {
                                                    stemPTd.style.cursor = 'pointer';
                                                    stemPTd.addEventListener('click', () => {
                                                        keyword = suffixStem;
                                                        search(keyword);
                                                    });
                                                }
                                                const stemSTd = document.querySelector('#type2SuffixBOTHStem');
                                                if (stemSTd) {
                                                    stemSTd.style.cursor = 'pointer';
                                                    stemSTd.addEventListener('click', () => {
                                                        keyword = suffixStem;
                                                        search(keyword);
                                                    });
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        else if (hasSuffix) {
                            hasPrefix = false;
                            const array = suffixData[0];
                            const suffixDeclensions = array.Suffixdeclensions;
                            for (declension of Object.values(suffixDeclensions)) {
                                const suffixDeclension = declension;
                                const suffixGender = array.Suffixgender;
                                const suffixNumber = array.Suffixnumber;
                                const suffixPerson = array.Suffixperson;
                                const suffixType = array.Suffixtype;
                                const suffix = array.usedSuffix;
                                const suffixStem = array.Suffixstem;
                                const suffixKeyword = keyword;*/
            /*console.log(
                suffixDeclension,
                suffixGender,
                suffixNumber,
                suffixPerson,
                suffixType,
                suffix,
                suffixStem
            );*/
            /*
            const stemMap = ALL_WORDS.MAP[suffixStem] || [];
            let stemDifinition = stemMap.definition || '...';
            const stemNotes = stemMap.usage_notes || '...';
 
            console.log(
                suffixDeclension,
                suffixGender,
                suffixNumber,
                suffixPerson,
                suffixType,
                suffix,
                suffixStem
            );
            console.log(
                stemMap,
                stemMap.genders,
                stemDifinition,
                stemNotes
            );
            let wordclass = '';
            for (const key of Object.values(WORDCLASSES)) {
                if (key.SHORT === suffixType) { wordclass = key.NAME }
            }; //console.log(wordclass);
 
 
            if (suffixType === 'n' || suffixType === 'adj') {//TODO due to how keywords populate suffix tables, ie theres symbols in parenthesis', it sometimes fails to find the correct stem.
 
                const combinedGendersObject = WORD_UTILS.combineGenders(stemMap.genders) // Key-value pairs
                for (const [gndr, def] of Object.entries(combinedGendersObject)) {
                    if (gndr === suffixGender) {
                        stemDifinition = def;
                    }
                }
 
                const SNhtml = `
                <div>
                    <table>
                        <tr>
                            <th style="width:116px">...</th>
                            <th>Word</th>
                            <th>Stem</th>
                            <th>Wordclass</th>
                            <th>Definition</th>
                            <th>Usage Notes</th>
                        </tr>
                        <tr>
                            <th>Info</th>
                            <td>${suffixKeyword}</td>
                            <td id="type2SuffixONLYStem">${suffixStem}</td>
                            <td>${wordclass}</td>
                            <td>${stemDifinition}</td>
                            <td>${stemNotes || '...'}</td>
                        </tr>
                    </table>
                    <br>
                    <table>
                        <tr>
                            <th style="width:116px">...</th>
                            <th>Suffix</th>
                            <th>Declension</th>
                            <th>Case</th>
                            <th>Gender</th>
                            <th>Number</th>
                        </tr>
                        <tr>
                            <th>Info</th>
                            <td>${suffix}</td>
                            <td>${suffixDeclension}</td>
                            <td>${suffixPerson}</td>
                            <td>${suffixGender}</td>
                            <td>${suffixNumber}</td>
                        </tr>
                    </table>
                </div>
                `;
 
                helperFunctions.standard.createPageById('page96', SNhtml);
            } else {
                const Shtml = `
                    <div>
                        <table>
                            <tr>
                                <th style="width:116px">...</th>
                                <th>Word</th>
                                <th>Stem</th>
                                <th>Wordclass</th>
                                <th>Definition</th>
                                <th>Usage Notes</th>
                            </tr>
                            <tr>
                                <th>Info</th>
                                <td>${suffixKeyword}</td>
                                <td id="type2SuffixONLYStem">${suffixStem}</td>
                                <td>${wordclass}</td>
                                <td>${stemDifinition}</td>
                                <td>${stemNotes || '...'}</td>
                            </tr>
                        </table>
                        <br>
                        <table>
                            <tr>
                                <th style="width:116px">...</th>
                                <th>Suffix</th>
                                <th>Gender</th>
                                <th>Number</th>
                                <th>Person</th>
                            </tr>
                            <tr>
                                <th>Suffix</th>
                                <td>${suffix}</td>
                                <td>${suffixGender}</td>
                                <td>${suffixNumber}</td>
                                <td>${suffixPerson}</td>
                            </tr>
                        </table>
                    </div>
                    <br>
                    <div id="suffixONLYPrefixtable">
                    </div>`;
 
                // Inject the content first, then attach listeners
                helperFunctions.standard.createPageById('page96', Shtml);
                const stemTd = document.querySelector('#type2SuffixONLYStem');
                if (stemTd) {
                    stemTd.style.cursor = 'pointer';
                    stemTd.addEventListener('click', () => {
                        keyword = suffixStem;
                        search(keyword);
                    });
                }
            }
 
            const suffixONLYPrefixtableWrapper = document.getElementById('suffixONLYPrefixtable');
            if (suffixONLYPrefixtableWrapper) {
                helperFunctions.matchtype1.neoVerbTables(1, keyword, suffixONLYPrefixtableWrapper);
 
                helperFunctions.tablegen.populateSummaryTables(suffixKeyword, { 'Verb-Table-Prefix': true, 'Verb-Table-Suffix': false });
            }
 
        }
        //console.log(array);
    }
    console.log('has prefix | ', hasPrefix);
    console.log('has suffix | ', hasSuffix);
*/
            openPageOld('page96');
        }
        else {//type 3
            console.log('-----type3-----');
            const searchHandler = ALL_WORDS.fetchByDefinition(keyword); // Array[]
            console.log('3', 'searchHandler |', searchHandler);
            searchHandler.forEach(entry => {

                // check for type === "n" then do for () {} else do normal thingi?
                if (entry.type === "n") {
                    for (const [gender, def] of Object.entries(WORD_UTILS.combineGenders(entry.genders))) {
                        helperFunctions.matchtype3.extraTableRow(entry.word, `n ${entry.declension}`, gender, def, entry.usage_notes || '...');

                    }
                } else {
                    const type = entry.type || '...';
                    const word = entry.word || '...';
                    const declension = entry.declension || '';
                    const forms = entry.forms || '...';
                    const usage_notes = entry.usage_notes || '...';
                    const definition = entry.definition || def || '...';


                    let wordclassText = '';
                    if (declension) {
                        wordclassText = `${type} ` + declension;
                    } else (wordclassText = type);

                    //console.log(word, wordclassText, forms, definition, usage_notes);// <-- works.
                    helperFunctions.matchtype3.extraTableRow(word, wordclassText, forms, definition, usage_notes);
                }
            });
        }
        helperFunctions.standard.reverseSearchIdsOnSearch();
    }

    // usage => for (let i = 0; i < rowAmount; i++) { extraTableRow(keyword or something custom); }

    //on-page button toggler
    function searchableTable(wordclass) {//turns the tables into paramteres. such that the function becomes global and reusable.
        switch (wordclass) {
            case 'n':
                const nounTable1 = document.getElementById('Noun-Table-Directive');
                const nounTable2 = document.getElementById('Noun-Table-Recessive');

                nounTable1.querySelectorAll('td').forEach(td => {
                    td.style.cursor = 'pointer';
                    const tdWord = td.textContent;
                    //console.log(keyword, td);
                    td.addEventListener('click', () => {
                        // Use the clicked cell's word, not a shared variable
                        search(tdWord);
                    });
                });
                nounTable2.querySelectorAll('td').forEach(td => {
                    td.style.cursor = 'pointer';
                    const tdWord = td.textContent;
                    //console.log(keyword, td);
                    td.addEventListener('click', () => {
                        // console.log(keyword);
                        search(tdWord);
                    });
                });
                break;
            case 'v':
                const verbTable1 = document.getElementById('Verb-Table-Prefix');
                const verbTable2 = document.getElementById('Verb-Table-Suffix');
                //console.log(verbTable1, verbTable2);

                verbTable1.querySelectorAll('td').forEach(td => {
                    td.style.cursor = 'pointer';
                    const tdWord = td.textContent;
                    //console.log(td, keyword);

                    td.addEventListener('click', () => {
                        search(tdWord);
                    });
                });
                verbTable2.querySelectorAll('td').forEach(td => {
                    td.style.cursor = 'pointer';
                    const tdWord = td.textContent;
                    //console.log(td, keyword);

                    td.addEventListener('click', () => {
                        search(tdWord);
                    });
                });
                break;
            default: console.warn('no wordclass');
        }
    }


    //evenlisteners vv
    // === Search button click ===
    searchBTN.addEventListener('click', () => {
        search(); // /\(/o.o\)/\ - Spooky the spider
    });

    // === Trigger search on Enter key ===
    searchFLD.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // prevent form submission
            search();
        }
    });
}
dictionaryPage(); // so constants arent redefined.
// this works as a wrapper function essentially^^

