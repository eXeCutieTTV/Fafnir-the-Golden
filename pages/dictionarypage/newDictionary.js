function dictionaryPage() {//TODO finally add more wordclasses to type1/type2. not only verbs & nouns :sob:
    // /\(/o.o\)/\ - Spooky the spider
    for (key of Object.values(ADJECTIVES.SUFFIXES.FLAT_MATCHES)) {
        if (key[3] === 'n') { key[3] = 'adj' }
    }
    let searchBTN = document.getElementById('search_button');
    let searchFLD = document.getElementById('search_field');

    // main search function
    function search(word) {
        if (searchFLD.value.length === 0) { return; }//doesnt search if searchFLD is empty
        let allMatchesArray = {
            type1: {
                v: {
                    lur: [],
                    regular: []
                },
                n: [],
                adj: [],
                adv: [],
                aux: [],
                pp: [],
                part: [],
                pn: [],
                det: [],
                con: [],
                cor: [],
            },
            type2: {
                temp: 'this is only updated if type2 is applicable'
            }
        }
        let matchType = 3 //asume its type3, if its not then we change it - type3 detection is if(matchType === 3).
        let keyword = ((searchFLD && searchFLD.value ? searchFLD.value.trim() : '').toLowerCase()) || word;
        console.log('keyword |', keyword);

        //clear searchFLD
        if (searchFLD && searchFLD.value.trim() !== '') {
            searchFLD.value = '';
            searchFLD.blur();
        }

        // for type1.1
        function isPronoun(word) {
            const matches = [];
            for (const [genderKey, genderMap] of Object.entries(PRONOUNS.MAP)) {
                for (const [numberKey, numberMap] of Object.entries(genderMap)) {
                    for (const [personKey, personMap] of Object.entries(numberMap)) {
                        for (const [caseKey, caseValue] of Object.entries(personMap)) {
                            if (caseValue === word) {
                                matchType = 1.1;
                                const result = {
                                    path: {
                                        gender: genderKey,
                                        number: numberKey,
                                        person: personKey,
                                        case: caseKey,
                                    },
                                    word: caseValue,
                                    type: 'personal'
                                }
                                matches.push(result);
                                allMatchesArray.type1.pn.push(result);
                            }
                        }
                    }
                }
            }
            return matches;
        }
        const pronounMatch = isPronoun(keyword);

        // for type1.2
        function isDeterminer(word) {
            const matches = [];
            for (const [genderKey, genderMap] of Object.entries(DETERMINERS.IRREGULARS.MAP)) {
                for (const [typeKey, typeMap] of Object.entries(genderMap)) {
                    for (const [numberKey, numberValue] of Object.entries(typeMap)) {
                        if (numberValue === word) {
                            matchType = 1.2;
                            const result = {
                                path: {
                                    gender: genderKey,
                                    number: numberKey,
                                },
                                word: numberValue,
                                type: typeKey
                            }
                            matches.push(result);
                            allMatchesArray.type1.det.push(result);
                        }
                    }
                }
            }
            return matches;
        }
        const determinerMatch = isDeterminer(keyword);

        // for type1.3
        function isCorrelative(word) {
            const matches = [];
            for (const [genderKey, genderMap] of Object.entries(CORRELATIVES.MAP)) {
                for (const [typeKey, typeMap] of Object.entries(genderMap)) {
                    for (const [caseKey, caseValue] of Object.entries(typeMap)) {
                        if (caseValue === word) {
                            matchType = 1.3;
                            const result = {
                                path: {
                                    gender: genderKey,
                                    case: caseKey,
                                },
                                word: caseValue,
                                type: typeKey
                            }
                            matches.push(result);
                            allMatchesArray.type1.cor.push(result);
                        }
                    }
                }
            }
            return matches;
        }
        const correlativeMatch = isCorrelative(keyword);

        // for type1.4
        function IsLur(word) {
            const matches = [];
            for (const [aspectKey, aspectMap] of Object.entries(LUR.MAP)) {
                for (const [tenseKey, tenseMap] of Object.entries(aspectMap)) {
                    for (const [genderKey, genderMap] of Object.entries(tenseMap)) {
                        for (const [personKey, personMap] of Object.entries(genderMap)) {
                            for (const [numberKey, numberValue] of Object.entries(personMap)) {
                                if (numberValue === word) {
                                    matchType = 1.4;
                                    const result = {
                                        path: {
                                            aspect: aspectKey,
                                            tense: tenseKey,
                                            gender: genderKey,
                                            person: personKey,
                                            number: numberKey
                                        },
                                        word: numberValue
                                    }
                                    matches.push(result);
                                    allMatchesArray.type1.v.lur.push(result);
                                }
                            }
                        }
                    }
                }
            }
            return matches;
        }
        const lurMatch = IsLur(keyword);

        // for type2
        const type2AffixesMap = {
            verbPrefix: helperFunctions.matchtype2.affixChecker(keyword, VERBS.PREFIXES.FLAT_MATCHES, true, true) || [],
            ppPrefix: helperFunctions.matchtype2.affixChecker(keyword, PREPOSITIONS.MAP, true, true) || [],
            verbSuffix: helperFunctions.matchtype2.affixChecker(keyword, VERBS.SUFFIXES.FLAT_MATCHES, false, true) || [],
            nounSuffix: helperFunctions.matchtype2.affixChecker(keyword, NOUNS.SUFFIXES.FLAT_MATCHES, false, true) || [],
            adjSuffix: helperFunctions.matchtype2.affixChecker(keyword, ADJECTIVES.SUFFIXES.FLAT_MATCHES, false, true) || [],
            pPrefix: helperFunctions.matchtype2.affixChecker(keyword, PARTICLES.MAP, true, true) || [],
            pSuffix: helperFunctions.matchtype2.affixChecker(keyword, PARTICLES.MAP, false, true) || [],
            auxPrefix: helperFunctions.matchtype2.affixChecker(keyword, VERBS.PREFIXES.FLAT_MATCHES, true, true) || [],
            detSuffix: [], //<---
        }
        helperFunctions.standard.clearPageById('page97'); //type 1
        helperFunctions.standard.clearPageById('page95'); //type 1.1
        helperFunctions.standard.clearPageById('page96'); //type 2
        helperFunctions.standard.clearPageById('dictionaryTable'); //type 3

        if (//type 1
            ALL_WORDS.MAP[keyword] && ALL_WORDS.MAP[keyword].word.length > 0
        ) {
            matchType = 1;
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
                        if (word === keyword) {
                            console.log('clean match |', keyword);
                            allMatchesArray.type1.adj.push(entry);

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
                                    helperFunctions.standard.searchableTable(wordclass);
                                });
                            });
                        }
                        break;
                    case 'adv':
                        if (word === keyword) {
                            console.log('clean match |', keyword);
                            allMatchesArray.type1.adv.push(entry);

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
                        if (word === keyword) {
                            console.log('clean match |', keyword);
                            allMatchesArray.type1.aux.push(entry);

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
                                    helperFunctions.standard.searchableTable('v');
                                });
                            });
                        }
                        break;
                    case 'con':
                        if (word === keyword) {
                            allMatchesArray.type1.con.push(entry);

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
                        if (entry.word === keyword) {
                            console.log(entry);
                            allMatchesArray.type1.det.push(entry);

                            helperFunctions.matchtype1.page97Base(keyword, wordclass);
                            const tableSearchable = document.getElementById('tableSearchBtn');


                            helperFunctions.tablegen.waitForElement(`#page97 .tablesContainer`).then(pageContainer => {

                                const html = `
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Word</th>
                                                <th>Definition</th>
                                                <th>Usage Notes</th>
                                                <th>Wordclass</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>${entry.word}</td>
                                                <td>${entry.definition}</td>
                                                <td>${entry.usage_notes}</td>
                                                <td>${entry.type}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                `;

                                helperFunctions.standard.createDivById('', pageContainer, html);

                                const html2 = `
                                    <table style="margin-top:10px" id="suffixTable">
                                        <thead>
                                            <tr>
                                                <th>Exalted</th>
                                                <th>Rational</th>
                                                <th>Monstrous</th>
                                                <th>Irrational</th>
                                                <th>Magical</th>
                                                <th>Mundane</th>
                                                <th>Abstract</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>${DETERMINERS.SUFFIXES.MAP.Exalted}</td>
                                                <td>${DETERMINERS.SUFFIXES.MAP.Rational}</td>
                                                <td>${DETERMINERS.SUFFIXES.MAP.Monstrous}</td>
                                                <td>${DETERMINERS.SUFFIXES.MAP.Irrational}</td>
                                                <td>${DETERMINERS.SUFFIXES.MAP.Magical}</td>
                                                <td>${DETERMINERS.SUFFIXES.MAP.Mundane}</td>
                                                <td>${DETERMINERS.SUFFIXES.MAP.Abstract}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                `;
                                helperFunctions.standard.createDivById('', pageContainer, html2);
                                helperFunctions.tablegen.populateSummaryTables(keyword, { 'suffixTable': false });

                                tableSearchable.addEventListener('click', () => {
                                    console.log(wordclass);
                                    helperFunctions.standard.searchableTable(wordclass);
                                });
                            });
                        }

                        break;
                    case 'n':
                        const NcombinedGendersObject = WORD_UTILS.combineGenders(entry.genders) // Key-value pairs
                        if (word === keyword) {
                            console.log('clean match |', keyword);
                            allMatchesArray.type1.n.push(entry);

                            helperFunctions.matchtype1.page97Base(keyword, wordclass);

                            const tableSearchable = document.getElementById('tableSearchBtn');


                            helperFunctions.tablegen.waitForElement(`#page97 .tablesContainer`).then(pageContainer => {
                                const html = `
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Word</th>
                                                <th>Declension</th>
                                                <th>Definition</th>
                                                <th>Gender</th>
                                                <th>Usage Notes</th>
                                                <th>Case</th>
                                                <th>Wordclass</th>
                                            </tr>
                                        </thead>
                                        <tbody id="tbody"></tbody>
                                    </table>
                                `;
                                helperFunctions.standard.createDivById('', pageContainer, html);
                                for (const [gender, def] of Object.entries(NcombinedGendersObject)) {
                                    const html = `
                                    <tr>
                                        <td>${keyword}</td>
                                        <td>${entry.declension}</td>
                                        <td>${def}</td>
                                        <td>${gender}</td>
                                        <td>${entry.usage_notes}</td>
                                        <td>${entry.case || 'Directive'}</td>
                                        <td>${entry.type}</td>
                                    </tr>
                                    `;
                                    helperFunctions.standard.insertTrIntoTableById('tbody', html);
                                }

                                const Nwrapper = document.getElementById('leftleftdivdictionary');
                                helperFunctions.matchtype1.neoNounTables(entry.declension, 1, Nwrapper, NcombinedGendersObject);
                                helperFunctions.matchtype1.neoNounTables(entry.declension, 2, Nwrapper, NcombinedGendersObject);

                                //const dirTable = document.getElementById('Noun-Table-Directive');
                                //const recTable = document.getElementById('Noun-Table-Recessive');
                                helperFunctions.tablegen.populateSummaryTables(keyword, { 'Noun-Table-Directive': false, 'Noun-Table-Recessive': false });

                                tableSearchable.addEventListener('click', () => {
                                    console.log(wordclass);
                                    helperFunctions.standard.searchableTable(wordclass);
                                });
                            });
                        }
                        break;
                    case 'part':
                        if (word === keyword) {
                            allMatchesArray.type1.part.push(entry);

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
                    case 'pp':
                        if (word === keyword) {
                            allMatchesArray.type1.pp.push(entry);

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
                        if (word === keyword) {
                            console.log('clean match |', keyword);
                            allMatchesArray.type1.v.regular.push(entry);

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
                                    helperFunctions.standard.searchableTable(wordclass);
                                });
                            });
                        }
                        break;
                    default: console.warn(`${wordclass} is an invalid wordclass`);
                        break;
                }
                if (document.getElementById('page97')) {
                    //console.log(wordclass);
                    openPageOld('page97');
                } else { return; }
            });
        }
        else if (matchType === 1.1) {//type 1.1
            console.log('-----type1.1-----');

            console.log(pronounMatch);
            pronounMatch.forEach(entry => {
                console.log(entry.word, 'is a personal pronoun');
            });

            const html = `
                <div>
                    <table>
                        <theader>
                            <tr>
                                <th style="width: 200px">Pronoun type</th>
                                <th>Pronoun</th>
                                <th>Gender</th>
                                <th>Person</th>
                                <th>Number</th>
                                <th>Case</th>
                            </tr>
                        </theader>
                        <tbody id="tbody"></tbody>
                    </table>
                </div>
            `;

            helperFunctions.standard.createPageById('page95', html);

            pronounMatch.forEach(entry => {

                const html = `
                    <tr>
                        <th>${entry.type}</th>
                        <td>${entry.word}</td>
                        <td>${entry.path.gender}</td>
                        <td>${entry.path.person}</td>
                        <td>${entry.path.number}</td>
                        <td>${entry.path.case}</td>
                    </tr>
                `;
                helperFunctions.standard.insertTrIntoTableById('tbody', html);
            });
            openPageOld('page95');
        }
        else if (matchType === 1.2) {//type 1.2

            console.log('-----type1.2-----');

            console.log(determinerMatch);
            determinerMatch.forEach(entry => {
                console.log(entry.word, 'is a personal pronoun');
            });

            const html = `
                <div>
                    <table>
                        <theader>
                            <tr>
                                <th style="width: 200px">Determiner type</th>
                                <th>Pronoun</th>
                                <th>Gender</th>
                                <th>Number</th>
                            </tr>
                        </theader>
                        <tbody id="tbody"></tbody>
                    </table>
                </div>
            `;

            helperFunctions.standard.createPageById('page95', html);

            determinerMatch.forEach(entry => {

                const html = `
                    <tr>
                        <th>${entry.type}</th>
                        <td>${entry.word}</td>
                        <td>${entry.path.gender}</td>
                        <td>${entry.path.number}</td>
                    </tr>
                `;
                helperFunctions.standard.insertTrIntoTableById('tbody', html);
            });
            openPageOld('page95');
        }
        else if (matchType === 1.3) {//type 1.3
            console.log('-----type1.3-----');

            console.log(correlativeMatch);
            correlativeMatch.forEach(entry => {
                console.log(entry.word, 'is a personal pronoun');
            });

            const html = `
                <div>
                    <table>
                        <theader>
                            <tr>
                                <th style="width: 200px">Correlative type</th>
                                <th>Pronoun</th>
                                <th>Gender</th>
                                <th>Case</th>
                            </tr>
                        </theader>
                        <tbody id="tbody"></tbody>
                    </table>
                </div>
            `;

            helperFunctions.standard.createPageById('page95', html);

            correlativeMatch.forEach(entry => {

                const html = `
                    <tr>
                        <th>${entry.type}</th>
                        <td>${entry.word}</td>
                        <td>${entry.path.gender}</td>
                        <td>${entry.path.case}</td>
                    </tr>
                `;
                helperFunctions.standard.insertTrIntoTableById('tbody', html);
            });
            openPageOld('page95');
        }
        else if (matchType === 1.4) {//type 1.4
            console.log('-----type1.4-----');

            const html = `
                <div>
                    <table>
                        <theader>
                            <tr>
                                <th>Word</th>
                                <th>Aspect</th>
                                <th>Tense</th>
                                <th>Gender</th>
                                <th>Person</th>
                                <th>Number</th>
                            </tr>
                        </theader>
                        <tbody id="tbody"></tbody>
                    </table>
                </div>
            `;
            helperFunctions.standard.createPageById('page95', html);
            lurMatch.forEach(entry => {
                const html = `
                    <tr>
                        <td>${entry.word}</td>
                        <td>${entry.path.aspect}</td>
                        <td>${entry.path.tense}</td>
                        <td>${entry.path.gender}</td>
                        <td>${entry.path.person}</td>
                        <td>${entry.path.number}</td>
                    </tr>
                `;
                helperFunctions.standard.insertTrIntoTableById('tbody', html);
            });
            openPageOld('page95');
        }//maybe change to if, insead of else if? vv
        else if (//type 2
            type2AffixesMap.verbPrefix ||
            type2AffixesMap.ppPrefix ||
            type2AffixesMap.verbSuffix ||
            type2AffixesMap.nounSuffix ||
            type2AffixesMap.adjSuffix ||
            type2AffixesMap.pPrefix ||
            type2AffixesMap.pSuffix ||
            type2AffixesMap.auxPrefix
        ) {
            console.log('-----type2-----');

            const affixTypesMap = {
                verbPrefix: { rawMap: type2AffixesMap.verbPrefix, resultMap: [], state: false },
                verbSuffix: { rawMap: type2AffixesMap.verbSuffix, resultMap: [], state: false },
                nounSuffix: { rawMap: type2AffixesMap.nounSuffix, resultMap: [], state: false },
                ppPrefix: { rawMap: type2AffixesMap.ppPrefix, resultMap: [], state: false },
                adjSuffix: { rawMap: type2AffixesMap.adjSuffix, resultMap: [], state: false },
                pPrefix: { rawMap: type2AffixesMap.pPrefix, resultMap: [], state: false },
                pSuffix: { rawMap: type2AffixesMap.pSuffix, resultMap: [], state: false },
                detSuffix: { rawMap: type2AffixesMap.detSuffix, resultMap: [], state: false },
                auxPrefix: { rawMap: type2AffixesMap.auxPrefix, resultMap: [], state: false },
                verbBothAffixes: { resultMap: { prefix: [], suffix: [], }, state: false },
                nounSuffixANDppPrefix: { resultMap: { preposition: [], suffix: [], }, state: false },
                nounSuffixANDpPrefix: { resultMap: { particle: [], suffix: [], }, state: false },
                nounSuffixANDpSuffix: { resultMap: { particle: [], suffix: [], }, state: false },
                adjSuffixANDpSuffix: { resultMap: { particle: [], suffix: [], }, state: false },
            }
            //console.log(affixTypesMap);
            allMatchesArray.type2 = affixTypesMap;

            //array / data update vv //make matchtype = 2 inside here vv. later do if matchtype === 2, createpagebyid, then each indivual if ...state, creates extra row on that page?
            if (affixTypesMap.verbPrefix.rawMap) {
                for (entry of Object.values(affixTypesMap.verbPrefix.rawMap)) {
                    if (ALL_WORDS.MAP[entry.affixStem] && ALL_WORDS.MAP[entry.affixStem].type === 'v') {
                        affixTypesMap.verbPrefix.resultMap.push(entry);
                        affixTypesMap.verbPrefix.state = true;
                    } else {
                        verbSuffix = helperFunctions.matchtype2.affixChecker(entry.affixStem, VERBS.SUFFIXES.FLAT_MATCHES, false, true) || [];
                        if (verbSuffix) {
                            for (entry2 of Object.values(verbSuffix)) {
                                if (ALL_WORDS.MAP[entry2.affixStem] && ALL_WORDS.MAP[entry.affixStem].type === 'v') {
                                    //console.log(entry);
                                    //console.log(entry2);

                                    entry.affixStem = entry2.affixStem;//fix affixStem for prefix.

                                    affixTypesMap.verbBothAffixes.resultMap.prefix.push(entry);
                                    affixTypesMap.verbBothAffixes.resultMap.suffix.push(entry2);
                                    affixTypesMap.verbBothAffixes.state = true;
                                }
                            }
                        }
                    }
                }
            }
            if (affixTypesMap.verbSuffix.rawMap) {
                for (entry of Object.values(affixTypesMap.verbSuffix.rawMap)) {
                    if (ALL_WORDS.MAP[entry.affixStem]) {
                        affixTypesMap.verbSuffix.resultMap.push(entry);
                        affixTypesMap.verbSuffix.state = true;
                    }
                }
            }
            if (affixTypesMap.nounSuffix.rawMap) {
                for (entry of Object.values(affixTypesMap.nounSuffix.rawMap)) {
                    //console.log(entry);
                    if (ALL_WORDS.MAP[entry.affixStem] && entry.affixType === 'n') {
                        affixTypesMap.nounSuffix.resultMap.push(entry);
                        affixTypesMap.nounSuffix.state = true;
                    } else {
                        pSuffix = helperFunctions.matchtype2.affixChecker(entry.affixStem, PARTICLES.MAP, false, true) || [];
                        for (entry2 of Object.values(pSuffix)) {
                            if (ALL_WORDS.MAP[entry2.affixStem] && entry.affixType === 'n') {

                                entry.affixStem = entry2.affixStem;//fix affixStem for prefix.

                                affixTypesMap.nounSuffixANDpSuffix.resultMap.particle.push(entry2);
                                affixTypesMap.nounSuffixANDpSuffix.resultMap.suffix.push(entry);
                                affixTypesMap.nounSuffixANDpSuffix.state = true;
                            }
                        }
                    }
                }
            }
            if (affixTypesMap.ppPrefix.rawMap/* && affixTypesMap.ppPrefix.rawMap[0].affixStem*/) {
                for (entry of Object.values(affixTypesMap.ppPrefix.rawMap)) {

                    if (ALL_WORDS.MAP[entry.affixStem]) {
                        affixTypesMap.ppPrefix.resultMap.push(entry);
                        affixTypesMap.ppPrefix.state = true;
                    } else {
                        nounSuffix = helperFunctions.matchtype2.affixChecker(entry.affixStem, NOUNS.SUFFIXES.FLAT_MATCHES, false, true) || [];
                        if (nounSuffix.length > 0) {
                            affixTypesMap.nounSuffixANDppPrefix.resultMap.preposition.push(entry);
                            for (obj of Object.values(nounSuffix)) {
                                entry.affixStem = obj.affixStem; //fix stem.
                                affixTypesMap.nounSuffixANDppPrefix.resultMap.suffix.push(obj);
                            }
                            affixTypesMap.nounSuffixANDppPrefix.state = true;
                        }
                    }
                }
            }
            if (affixTypesMap.pPrefix.rawMap) {
                for (entry of Object.values(affixTypesMap.pPrefix.rawMap)) {
                    if (ALL_WORDS.MAP[entry.affixStem]) {
                        affixTypesMap.pPrefix.resultMap.push(entry);
                        affixTypesMap.pPrefix.state = true;
                    } else {
                        nounSuffix = helperFunctions.matchtype2.affixChecker(entry.affixStem, NOUNS.SUFFIXES.FLAT_MATCHES, false, true) || [];
                        if (nounSuffix.length > 0) {
                            affixTypesMap.nounSuffixANDpPrefix.resultMap.particle.push(entry);
                            for (obj of Object.values(nounSuffix)) {
                                entry.affixStem = obj.affixStem; //fix stem.
                                affixTypesMap.nounSuffixANDpPrefix.resultMap.suffix.push(obj);
                            }
                            affixTypesMap.nounSuffixANDpPrefix.state = true;
                        }
                    }
                }
            }
            if (affixTypesMap.pSuffix.rawMap) {
                for (entry of Object.values(affixTypesMap.pSuffix.rawMap)) {
                    if (ALL_WORDS.MAP[entry.affixStem]) {
                        affixTypesMap.pSuffix.resultMap.push(entry);
                        affixTypesMap.pSuffix.state = true;
                    } else {
                        nounSuffix = helperFunctions.matchtype2.affixChecker(entry.affixStem, NOUNS.SUFFIXES.FLAT_MATCHES, false, true) || [];
                        if (nounSuffix.length > 0) {
                            affixTypesMap.nounSuffixANDpSuffix.resultMap.particle.push(entry);
                            for (obj of Object.values(nounSuffix)) {
                                entry.affixStem = obj.affixStem; //fix stem.
                                affixTypesMap.nounSuffixANDpSuffix.resultMap.suffix.push(obj);
                            }
                            affixTypesMap.nounSuffixANDpSuffix.state = true;
                        }
                    }
                }
            }
            if (affixTypesMap.adjSuffix.rawMap) {
                for (entry of Object.values(affixTypesMap.adjSuffix.rawMap)) {
                    if (ALL_WORDS.MAP[entry.affixStem] && entry.affixType === 'adj') {
                        affixTypesMap.adjSuffix.resultMap.push(entry);
                        affixTypesMap.adjSuffix.state = true;
                    } else {
                        pSuffix = helperFunctions.matchtype2.affixChecker(entry.affixStem, PARTICLES.MAP, false, true) || [];
                        for (entry2 of Object.values(pSuffix)) {
                            if (ALL_WORDS.MAP[entry2.affixStem] && entry.affixType === 'adj') {

                                entry.affixStem = entry2.affixStem;//fix affixStem for prefix.

                                affixTypesMap.adjSuffixANDpSuffix.resultMap.particle.push(entry2);
                                affixTypesMap.adjSuffixANDpSuffix.resultMap.suffix.push(entry);
                                affixTypesMap.adjSuffixANDpSuffix.state = true;
                            }
                        }
                    }
                }
            }
            if (affixTypesMap.auxPrefix.rawMap) {
                for (entry of Object.values(affixTypesMap.auxPrefix.rawMap)) {
                    if (ALL_WORDS.MAP[entry.affixStem] && ALL_WORDS.MAP[entry.affixStem].type === 'aux') {
                        affixTypesMap.auxPrefix.resultMap.push(entry);
                        affixTypesMap.auxPrefix.state = true;
                    }
                }
            }

            //page logic vv
            if (affixTypesMap.verbPrefix.state) {
                console.log('--verb prefix--');
                matchType = 2;


                const stemMap = ALL_WORDS.MAP[affixTypesMap.verbPrefix.resultMap[0].affixStem] || [];
                const stemDifinition = stemMap.definition || '...';
                const stemNotes = stemMap.usage_notes || '...';

                let wordclass = '';
                for (const key of Object.values(WORDCLASSES)) {
                    if (key.SHORT === 'v') { wordclass = key.NAME }
                };

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
                                        <td id="type2PrefixONLYStem">${affixTypesMap.verbPrefix.resultMap[0].affixStem}</td>
                                        <td>${wordclass}</td>
                                        <td>${stemDifinition}</td>
                                        <td>${stemNotes || '...'}</td>
                                    </tr>
                                </table>
                            </div>
                            <br>
                            <div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th style="width:116px">...</th>
                                            <th>Prefix</th>
                                            <th>Gender</th>
                                            <th>Number</th>
                                            <th>Person</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbody"></tbody>
                                </table>
                            </div>
                            <br>
                            <br>
                            <br>
                            <div id="prefixONLYSuffixtable"></div>
                        `;
                helperFunctions.standard.createPageById('page96', html);
                affixTypesMap.verbPrefix.resultMap.forEach(arr => {


                    const prefixGender = arr.affixGender;
                    const prefixNumber = arr.affixNumber;
                    const prefixPerson = arr.affixPerson;
                    const prefix = arr.affix;

                    const html = `
                            <tr>
                                <th>Prefix</th>
                                <td>${prefix}</td>
                                <td>${prefixGender}</td>
                                <td>${prefixNumber}</td>
                                <td>${prefixPerson}</td>
                            </tr>`

                    helperFunctions.standard.insertTrIntoTableById('tbody', html);
                });

                const stemSTd = document.querySelector('#type2PrefixONLYStem');
                if (stemSTd) {
                    stemSTd.style.cursor = 'pointer';
                    stemSTd.addEventListener('click', () => {
                        keyword = affixTypesMap.verbPrefix.resultMap[0].affixStem;
                        search(keyword);
                    });
                }
                const wrapper = document.getElementById('prefixONLYSuffixtable');
                if (wrapper) {
                    helperFunctions.matchtype1.neoVerbTables(2, keyword, wrapper);

                    helperFunctions.tablegen.populateSummaryTables(keyword, { 'Verb-Table-Prefix': true, 'Verb-Table-Suffix': false });
                }

                openPageOld('page96');
            }
            if (affixTypesMap.verbSuffix.state) {
                console.log('--verb suffix--');
                matchType = 2;


                const stemMap = ALL_WORDS.MAP[affixTypesMap.verbSuffix.resultMap[0].affixStem] || [];
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
                                    <td id="type2SuffixONLYStem">${affixTypesMap.verbSuffix.resultMap[0].affixStem}</td>
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
                                <tbody id="tbody"></tbody>
                            </table>
                        </div>
                        <br>
                        <br>
                        <br>
                        <div id="suffixONLYPrefixtable"></div>
                    `;
                helperFunctions.standard.createPageById('page96', html);
                affixTypesMap.verbSuffix.resultMap.forEach(arr => {
                    //console.log('arr | ', arr);


                    const suffixGender = arr.affixGender;
                    const suffixNumber = arr.affixNumber;
                    const suffixPerson = arr.affixPerson;
                    const suffix = arr.affix;
                    const suffixStem = arr.affixStem;


                    if (ALL_WORDS.MAP[suffixStem]) {
                        const PShtml = `
                                <tr>
                                    <th>Suffix</th>
                                    <td>${suffix}</td>
                                    <td>${suffixGender}</td>
                                    <td>${suffixNumber}</td>
                                    <td>${suffixPerson}</td>
                                </tr>
                            `;

                        helperFunctions.standard.insertTrIntoTableById('tbody', PShtml);
                    } else { return; }
                });
                if (document.getElementById('tbody').rows.length > 0) { //only openpage etc if the tbody has shit in it.
                    const stemSTd = document.querySelector('#type2SuffixONLYStem');
                    if (stemSTd) {
                        stemSTd.style.cursor = 'pointer';
                        stemSTd.addEventListener('click', () => {
                            keyword = affixTypesMap.verbSuffix.resultMap[0].affixStem;
                            search(keyword);
                        });
                    }
                    const suffixONLYPrefixtableWrapper = document.getElementById('suffixONLYPrefixtable');
                    if (suffixONLYPrefixtableWrapper) {
                        helperFunctions.matchtype1.neoVerbTables(1, keyword, suffixONLYPrefixtableWrapper);

                        helperFunctions.tablegen.populateSummaryTables(keyword, { 'Verb-Table-Prefix': true, 'Verb-Table-Suffix': false });
                    }

                    openPageOld('page96');
                }

                openPageOld('page96');
            }
            if (affixTypesMap.verbBothAffixes.state) {
                console.log('--both verb affixes--');
                matchType = 2;


                const stemMap = ALL_WORDS.MAP[affixTypesMap.verbBothAffixes.resultMap.prefix[0].affixStem] || [];
                const stemDifinition = stemMap.definition || '...';
                const stemNotes = stemMap.usage_notes || '...';

                let wordclass = '';
                for (const key of Object.values(WORDCLASSES)) {
                    if (key.SHORT === 'v') { wordclass = key.NAME }
                };

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
                                        <td id="type2PrefixONLYStem">${affixTypesMap.verbBothAffixes.resultMap.prefix[0].affixStem}</td>
                                        <td>${wordclass}</td>
                                        <td>${stemDifinition}</td>
                                        <td>${stemNotes || '...'}</td>
                                    </tr>
                                </table>
                            </div>
                            <br>
                            <div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th style="width:116px">...</th>
                                            <th>Prefix</th>
                                            <th>Gender</th>
                                            <th>Number</th>
                                            <th>Person</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbodyPrefix"></tbody>
                                </table>
                            </div>
                            <br>
                            <div>
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
                                    <tbody id="tbodySuffix"></tbody>
                                </table>
                            </div>
                        `;
                helperFunctions.standard.createPageById('page96', html);
                affixTypesMap.verbBothAffixes.resultMap.prefix.forEach(arr => {

                    if (ALL_WORDS.MAP[arr.affixStem]) {
                        const prefixGender = arr.affixGender;
                        const prefixNumber = arr.affixNumber;
                        const prefixPerson = arr.affixPerson;
                        const prefix = arr.affix;

                        const html = `
                                <tr>
                                    <th>Prefix</th>
                                    <td>${prefix}</td>
                                    <td>${prefixGender}</td>
                                    <td>${prefixNumber}</td>
                                    <td>${prefixPerson}</td>
                                </tr>`

                        helperFunctions.standard.insertTrIntoTableById('tbodyPrefix', html);
                    }
                });
                affixTypesMap.verbBothAffixes.resultMap.suffix.forEach(arr => {

                    if (ALL_WORDS.MAP[arr.affixStem]) {
                        const suffixGender = arr.affixGender;
                        const suffixNumber = arr.affixNumber;
                        const suffixPerson = arr.affixPerson;
                        const suffix = arr.affix;

                        const html = `
                                <tr>
                                    <th>Suffix</th>
                                    <td>${suffix}</td>
                                    <td>${suffixGender}</td>
                                    <td>${suffixNumber}</td>
                                    <td>${suffixPerson}</td>
                                </tr>`

                        helperFunctions.standard.insertTrIntoTableById('tbodySuffix', html);
                    }
                });

                const stemSTd = document.querySelector('#type2PrefixONLYStem');
                if (stemSTd) {
                    stemSTd.style.cursor = 'pointer';
                    stemSTd.addEventListener('click', () => {
                        keyword = affixTypesMap.verbBothAffixes.resultMap.prefix[0].affixStem; //console.log(keyword);
                        search(keyword);
                    });
                }

                openPageOld('page96');
            }
            if (affixTypesMap.nounSuffix.state) {
                console.log('--noun suffix--');
                matchType = 2;


                const stemMap = ALL_WORDS.MAP[affixTypesMap.nounSuffix.resultMap[0].affixStem] || []; console.log(stemMap);
                let stemDifinition = stemMap.definition || '...';
                const stemNotes = stemMap.usage_notes || '...';

                let wordclass = '';
                for (const key of Object.values(WORDCLASSES)) {
                    if (key.SHORT === 'n') { wordclass = key.NAME }
                };

                const html = `
                    <div>
                        <table>
                            <tr>
                                <th style="width:116px">...</th>
                                <th>Word</th>
                                <th>Stem</th>
                                <th>Wordclass</th>
                                <th>Usage Notes</th>
                            </tr>
                            <tr>
                                <th>Info</th>
                                <td>${keyword}</td>
                                <td id="type2SuffixONLYStem">${affixTypesMap.nounSuffix.resultMap[0].affixStem}</td>
                                <td>${wordclass}</td>
                                <td>${stemNotes || '...'}</td>
                            </tr>
                        </table>
                    </div>
                    <br>
                    <br>
                    <br>
                    <div id=tablesContainer>
                        <table>
                            <thead>
                                <tr>
                                    <th style="width:116px">...</th>
                                    <th>Suffix</th>
                                    <th>Declension</th>
                                    <th>Gender</th>
                                    <th>Number</th>
                                    <th>Case</th>
                                    <th>Definition</th>
                                </tr>
                            </thead>
                            <tbody id="tbody"></tbody>
                        </table>
                    </div>
                    `;
                helperFunctions.standard.createPageById('page96', html);
                affixTypesMap.nounSuffix.resultMap.forEach(arr => {
                    const suffixDeclension = arr.affixDeclension;
                    const suffixGender = arr.affixGender;
                    const suffixNumber = arr.affixNumber;
                    const suffixCase = arr.affixCase;
                    const suffix = arr.affix;

                    const combinedGendersObject = WORD_UTILS.combineGenders(stemMap.genders) // Key-value pairs
                    for (const [gndr, def] of Object.entries(combinedGendersObject)) {
                        if (gndr === suffixGender) {
                            stemDifinition = def;
                            console.log(combinedGendersObject);
                            console.log(gndr, def);

                            const html = `
                                <tr>
                                    <th>Info</th>
                                    <td>${suffix}</td>
                                    <td>${suffixDeclension}</td>
                                    <td>${suffixGender}</td>
                                    <td>${suffixNumber}</td>
                                    <td>${suffixCase}</td>
                                    <td>${stemDifinition}</td>
                                </tr>
                                `;
                            helperFunctions.standard.insertTrIntoTableById('tbody', html);
                        }
                    }
                });
                const stemTd = document.querySelector('#type2SuffixONLYStem');
                if (stemTd) {
                    stemTd.style.cursor = 'pointer';
                    stemTd.addEventListener('click', () => {
                        keyword = affixTypesMap.nounSuffix.resultMap[0].affixStem;
                        search(keyword);
                    });
                }

                openPageOld('page96');
            }
            if (affixTypesMap.ppPrefix.state) {
                console.log('--prepositional prefix--');
                matchType = 2;


                const array = affixTypesMap.ppPrefix.resultMap[0];
                const prefix = array.affix;
                const prefixStem = array.affixStem;

                const ppArray = ALL_WORDS.MAP[prefix];
                const ppDefinition = ppArray.definition;
                const ppUsage_notes = ppArray.usage_notes;
                console.log(ppArray);

                if (ALL_WORDS.MAP[prefixStem]) {
                    console.log('clean match');

                    const arr = ALL_WORDS.MAP[prefixStem];
                    console.log(arr);
                    const NcombinedGendersObject = WORD_UTILS.combineGenders(arr.genders) // Key-value pairs
                    console.log(NcombinedGendersObject);


                    const html = `
                        <div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>...</th>
                                        <th>Stem</th>
                                        <th>Declension</th>
                                        <th>Definition</th>
                                        <th>Gender</th>
                                        <th>Usage_Notes</th>
                                        <th>Wordclass</th>
                                    </tr>
                                </thead>
                                <tbody id="tbodyPP"></tbody>
                            </table>
                        </div>
                        <div style="margin-top:35px">
                            <table>
                                <thead>
                                    <tr>
                                        <th>...</th>
                                        <th style="width:116px">Prefix</th>
                                        <th>Definition</th>
                                        <th>Usage Notes</th>
                                        <th>Wordclass</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>Info</th>
                                        <td>${prefix || '...'}</td>
                                        <td>${ppDefinition || '...'}</td>
                                        <td>${ppUsage_notes || '...'}</td>
                                        <td>${'preposition'}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div style="margin-top:50px" id="ppNounTable"></div>
                    `;
                    helperFunctions.standard.createPageById('page96', html);
                    for (const [gndr, def] of Object.entries(NcombinedGendersObject)) {
                        console.log(gndr, def);
                        const htmlPP = `
                            <tr>
                                <th>Info</th>
                                <td>${prefixStem}</td>
                                <td>${arr.declension}</td>
                                <td>${def}</td>
                                <td>${gndr}</td>
                                <td>${arr.usage_notes || '...'}</td>
                                <td>${'noun'}</td>
                            </tr>
                        `;
                        helperFunctions.standard.insertTrIntoTableById('tbodyPP', htmlPP);
                    }

                    const nounTblDiv = document.getElementById('ppNounTable');
                    helperFunctions.matchtype1.neoNounTables(arr.declension, 1, nounTblDiv, NcombinedGendersObject);
                    helperFunctions.matchtype1.neoNounTables(arr.declension, 2, nounTblDiv, NcombinedGendersObject);
                    helperFunctions.tablegen.populateSummaryTables(keyword, { 'Noun-Table-Directive': false, 'Noun-Table-Recessive': false });

                    openPageOld('page96');
                }
            }
            if (affixTypesMap.nounSuffixANDppPrefix.state) {
                console.log('--noun with pp and suffix--');
                matchType = 2;


                const stemMap = ALL_WORDS.MAP[affixTypesMap.nounSuffixANDppPrefix.resultMap.suffix[0].affixStem] || []; console.log(stemMap);
                let stemDifinition = stemMap.definition || '...';
                const stemNotes = stemMap.usage_notes || '...';

                let wordclass = '';
                for (const key of Object.values(WORDCLASSES)) {
                    if (key.SHORT === 'n') { wordclass = key.NAME }
                };

                const html = `
                                <div>
                                    <table>
                                        <tr>
                                            <th style="width:116px">...</th>
                                            <th>Word</th>
                                            <th>Stem</th>
                                            <th>Wordclass</th>
                                            <th>Usage Notes</th>
                                        </tr>
                                        <tr>
                                            <th>Info</th>
                                            <td>${keyword}</td>
                                            <td id="type2SuffixONLYStem">${affixTypesMap.nounSuffixANDppPrefix.resultMap.suffix[0].affixStem}</td>
                                            <td>${wordclass}</td>
                                            <td>${stemNotes || '...'}</td>
                                        </tr>
                                    </table>
                                </div>
                                <br>
                                <br>
                                <br>
                                <div id=tablesContainer>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th style="width:116px">...</th>
                                                <th>Suffix</th>
                                                <th>Declension</th>
                                                <th>Gender</th>
                                                <th>Number</th>
                                                <th>Case</th>
                                                <th>Definition</th>
                                            </tr>
                                        </thead>
                                        <tbody id="tbody"></tbody>
                                    </table>
                                </div>
                                `;
                helperFunctions.standard.createPageById('page96', html);
                affixTypesMap.nounSuffixANDppPrefix.resultMap.suffix.forEach(arr => {
                    const suffixDeclension = arr.affixDeclension;
                    const suffixGender = arr.affixGender;
                    const suffixNumber = arr.affixNumber;
                    const suffixCase = arr.affixCase;
                    const suffix = arr.affix;

                    const combinedGendersObject = WORD_UTILS.combineGenders(stemMap.genders) // Key-value pairs
                    for (const [gndr, def] of Object.entries(combinedGendersObject)) {
                        if (gndr === suffixGender) {
                            stemDifinition = def;
                            //console.log(combinedGendersObject);
                            //console.log(gndr, def);

                            const html = `
                                <tr>
                                    <th>Info</th>
                                    <td>${suffix}</td>
                                    <td>${suffixDeclension}</td>
                                    <td>${suffixGender}</td>
                                    <td>${suffixNumber}</td>
                                    <td>${suffixCase}</td>
                                    <td>${stemDifinition}</td>
                                </tr>
                                `;
                            helperFunctions.standard.insertTrIntoTableById('tbody', html);
                        }
                    }
                });

                //added div vv
                const prefix = affixTypesMap.nounSuffixANDppPrefix.resultMap.prefix[0].affix; console.log(prefix);
                const map = ALL_WORDS.MAP[affixTypesMap.nounSuffixANDppPrefix.resultMap.prefix[0].affix]; console.log(map);
                const ppHtml = `
                                <table style="margin-top:35px">
                                    <thead>
                                        <tr>
                                            <th>...</th>
                                            <th style="width:116px">Prefix</th>
                                            <th>Definition</th>
                                            <th>Usage Notes</th>
                                            <th>Wordclass</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th>Info</th>
                                            <td>${prefix || '...'}</td>
                                            <td>${map.definition || '...'}</td>
                                            <td>${map.usage_notes || '...'}</td>
                                            <td>${'preposition'}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            `;

                const wrapper = document.getElementById('tablesContainer');
                helperFunctions.standard.createDivById('', wrapper, ppHtml);

                openPageOld('page96');
            }
            if (affixTypesMap.pPrefix.state) {
                console.log('--noun with particle--');
                matchType = 2;


                const array = affixTypesMap.pPrefix.resultMap[0];
                const prefix = array.affix;
                const prefixStem = array.affixStem;

                const pArray = ALL_WORDS.MAP[prefix];
                const pDefinition = pArray.definition;
                const pUsage_notes = pArray.usage_notes;
                console.log(array);
                if (ALL_WORDS.MAP[prefixStem]) {
                    console.log('clean match');

                    let nounTblDiv = '';
                    let html = '';

                    const arr = ALL_WORDS.MAP[prefixStem];
                    const NcombinedGendersObject = WORD_UTILS.combineGenders(arr.genders) // Key-value pairs
                    switch (prefix) {
                        case 'i':
                            html = `
                                <div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>...</th>
                                                <th>Stem</th>
                                                <th>Declension</th>
                                                <th>Definition</th>
                                                <th>Gender</th>
                                                <th>Usage_Notes</th>
                                                <th>Wordclass</th>
                                            </tr>
                                        </thead>
                                        <tbody id="tbodyP"></tbody>
                                    </table>
                                </div>
                                <div style="margin-top:35px">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>...</th>
                                                <th style="width:116px">Prefix</th>
                                                <th>Definition</th>
                                                <th>Usage Notes</th>
                                                <th>Wordclass</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th>Info</th>
                                                <td>${prefix || '...'}</td>
                                                <td>${pDefinition || '...'}</td>
                                                <td>${pUsage_notes || '...'}</td>
                                                <td>${'particle'}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div style="margin-top:50px" id="pNounTable"></div>
                            `;
                            helperFunctions.standard.createPageById('page96', html);
                            for (const [gndr, def] of Object.entries(NcombinedGendersObject)) {
                                //console.log(gndr, def);
                                const htmlP = `
                                    <tr>
                                        <th>Info</th>
                                        <td>${prefixStem}</td>
                                        <td>${arr.declension}</td>
                                        <td>${def}</td>
                                        <td>${gndr}</td>
                                        <td>${arr.usage_notes || '...'}</td>
                                        <td>${'noun'}</td>
                                    </tr>
                                `;
                                helperFunctions.standard.insertTrIntoTableById('tbodyP', htmlP);
                            }

                            nounTblDiv = document.getElementById('pNounTable');
                            helperFunctions.matchtype1.neoNounTables(arr.declension, 1, nounTblDiv, NcombinedGendersObject);
                            helperFunctions.matchtype1.neoNounTables(arr.declension, 2, nounTblDiv, NcombinedGendersObject);
                            helperFunctions.tablegen.populateSummaryTables(keyword, { 'Noun-Table-Directive': false, 'Noun-Table-Recessive': false });
                            break;

                        default:
                            console.warn(`${prefix} is not available as a noun prefix`);
                            return;
                    }
                    openPageOld('page96');
                }
            }
            if (affixTypesMap.pSuffix.state) {
                console.log('--p suffix--');
                matchType = 2;


                const array = affixTypesMap.pSuffix.resultMap[0];
                const particle = array.affix;
                const particleStem = array.affixStem;

                const pArray = ALL_WORDS.MAP[particle];
                const pDefinition = pArray.definition;
                const pUsage_notes = pArray.usage_notes;
                //console.log(pArray);
                if (ALL_WORDS.MAP[particleStem]) {
                    console.log('clean match');

                    const arr = ALL_WORDS.MAP[particleStem];
                    console.log(arr);
                    if (arr.type === 'adj') {
                        console.log('adj')

                        switch (particle) {
                            case 'ān':
                            case 'ōn':
                            case 'ūn':
                                const html = `
                                    <div>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>...</th>
                                                    <th>Stem</th>
                                                    <th>Declension</th>
                                                    <th>Definition</th>
                                                    <th>Usage_Notes</th>
                                                    <th>Wordclass</th>
                                                </tr>
                                            </thead>
                                            <tbody id="tbodyP"></tbody>
                                        </table>
                                    </div>
                                    <div style="margin-top:35px">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>...</th>
                                                    <th style="width:116px">Suffix</th>
                                                    <th>Definition</th>
                                                    <th>Usage Notes</th>
                                                    <th>Wordclass</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th>Info</th>
                                                    <td>${particle || '...'}</td>
                                                    <td>${pDefinition || '...'}</td>
                                                    <td>${pUsage_notes || '...'}</td>
                                                    <td>${'particle'}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div style="margin-top:50px" id="pNounTable"></div>
                                `;
                                helperFunctions.standard.createPageById('page96', html);
                                const htmlP = `
                                        <tr>
                                            <th>Info</th>
                                            <td>${particleStem}</td>
                                            <td>${arr.declension}</td>
                                            <td>${arr.definition}</td>
                                            <td>${arr.usage_notes || '...'}</td>
                                            <td>${'noun'}</td>
                                        </tr>
                                    `;
                                helperFunctions.standard.insertTrIntoTableById('tbodyP', htmlP);

                                const ADJwrapper = document.getElementById('pNounTable');
                                helperFunctions.matchtype1.neoAdjectiveTables(arr.declension, 1, ADJwrapper);
                                helperFunctions.matchtype1.neoAdjectiveTables(arr.declension, 2, ADJwrapper);
                                helperFunctions.tablegen.populateSummaryTables(keyword, { 'Adjective-Table-Directive': false, 'Adjective-Table-Recessive': false });

                                openPageOld('page96');
                                break;
                            case 'nyl':
                                console.log('adj turned into adv');
                                const htmlADV = `
                                    <div>
                                        <table>
                                            <theader>
                                                <tr>
                                                    <th>Word</th>
                                                    <th>Definition</th>
                                                    <th>Usage Notes</th>
                                                    <th>Wordclass</th>
                                                </tr>
                                            </theader>
                                            <tbody>
                                                <tr>
                                                    <td>${arr.word}</td>
                                                    <td>${arr.definition}</td>
                                                    <td>${arr.usage_notes || '...'}</td>
                                                    <td>${'Adverb'}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                `;
                                helperFunctions.standard.createPageById('page96', htmlADV);
                                openPageOld('page96');
                                break;
                            default:
                                console.warn(`${particle} is not available as a noun suffix`);
                                break;
                        }
                    } else if (arr.type === 'n') {
                        const NcombinedGendersObject = WORD_UTILS.combineGenders(arr.genders) // Key-value pairs
                        //console.log(NcombinedGendersObject);

                        switch (particle) {
                            case 'ān':
                            case 'ōn':
                            case 'ūn':
                                const html = `
                                    <div>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>...</th>
                                                    <th>Stem</th>
                                                    <th>Declension</th>
                                                    <th>Definition</th>
                                                    <th>Gender</th>
                                                    <th>Usage_Notes</th>
                                                    <th>Wordclass</th>
                                                </tr>
                                            </thead>
                                            <tbody id="tbodyP"></tbody>
                                        </table>
                                    </div>
                                    <div style="margin-top:35px">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>...</th>
                                                    <th style="width:116px">Prefix</th>
                                                    <th>Definition</th>
                                                    <th>Usage Notes</th>
                                                    <th>Wordclass</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th>Info</th>
                                                    <td>${particle || '...'}</td>
                                                    <td>${pDefinition || '...'}</td>
                                                    <td>${pUsage_notes || '...'}</td>
                                                    <td>${'particle'}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div style="margin-top:50px" id="pNounTable"></div>
                                `;
                                helperFunctions.standard.createPageById('page96', html);
                                for (const [gndr, def] of Object.entries(NcombinedGendersObject)) {
                                    console.log(gndr, def);
                                    const htmlP = `
                                        <tr>
                                            <th>Info</th>
                                            <td>${particleStem}</td>
                                            <td>${arr.declension}</td>
                                            <td>${def}</td>
                                            <td>${gndr}</td>
                                            <td>${arr.usage_notes || '...'}</td>
                                            <td>${'noun'}</td>
                                        </tr>
                                    `;
                                    helperFunctions.standard.insertTrIntoTableById('tbodyP', htmlP);
                                }

                                const nounTblDiv = document.getElementById('pNounTable');
                                helperFunctions.matchtype1.neoNounTables(arr.declension, 1, nounTblDiv, NcombinedGendersObject);
                                helperFunctions.matchtype1.neoNounTables(arr.declension, 2, nounTblDiv, NcombinedGendersObject);
                                helperFunctions.tablegen.populateSummaryTables(keyword, { 'Noun-Table-Directive': false, 'Noun-Table-Recessive': false });

                                openPageOld('page96');
                                break;
                            default:
                                console.warn(`${particle} is not available as a noun suffix`);
                                break;
                        }
                    }
                }
            }
            if (affixTypesMap.nounSuffixANDpPrefix.state) {
                console.log('--noun with particle prefix and suffix--');
                matchType = 2;


                const stemMap = ALL_WORDS.MAP[affixTypesMap.nounSuffixANDpPrefix.resultMap.suffix[0].affixStem] || []; //console.log(stemMap);
                let stemDifinition = stemMap.definition || '...';
                const stemNotes = stemMap.usage_notes || '...';

                let wordclass = '';
                for (const key of Object.values(WORDCLASSES)) {
                    if (key.SHORT === 'n') { wordclass = key.NAME }
                };
                if (affixTypesMap.nounSuffixANDpPrefix.resultMap.particle[0].affix != 'i') { //<--
                    console.warn(`${affixTypesMap.nounSuffixANDpPrefix.resultMap.particle[0].affix} is not available as a noun prefix`);
                    return;
                }
                const html = `
                    <div>
                        <table>
                            <tr>
                                <th style="width:116px">...</th>
                                <th>Word</th>
                                <th>Stem</th>
                                <th>Wordclass</th>
                                <th>Usage Notes</th>
                            </tr>
                            <tr>
                                <th>Info</th>
                                <td>${keyword}</td>
                                <td id="type2SuffixONLYStem">${affixTypesMap.nounSuffixANDpPrefix.resultMap.suffix[0].affixStem}</td>
                                <td>${wordclass}</td>
                                <td>${stemNotes || '...'}</td>
                            </tr>
                        </table>
                    </div>
                    <br>
                    <br>
                    <br>
                    <div id=tablesContainer>
                        <table>
                            <thead>
                                <tr>
                                    <th style="width:116px">...</th>
                                    <th>Suffix</th>
                                    <th>Declension</th>
                                    <th>Gender</th>
                                    <th>Number</th>
                                    <th>Case</th>
                                    <th>Definition</th>
                                </tr>
                            </thead>
                            <tbody id="tbody"></tbody>
                        </table>
                    </div>
                    `;
                helperFunctions.standard.createPageById('page96', html);
                affixTypesMap.nounSuffixANDpPrefix.resultMap.suffix.forEach(arr => {
                    const suffixDeclension = arr.affixDeclension;
                    const suffixGender = arr.affixGender;
                    const suffixNumber = arr.affixNumber;
                    const suffixCase = arr.affixCase;
                    const suffix = arr.affix;

                    const combinedGendersObject = WORD_UTILS.combineGenders(stemMap.genders) // Key-value pairs
                    for (const [gndr, def] of Object.entries(combinedGendersObject)) {
                        if (gndr === suffixGender) {
                            stemDifinition = def;
                            //console.log(combinedGendersObject);
                            //console.log(gndr, def);

                            const html = `
                                <tr>
                                    <th>Info</th>
                                    <td>${suffix}</td>
                                    <td>${suffixDeclension}</td>
                                    <td>${suffixGender}</td>
                                    <td>${suffixNumber}</td>
                                    <td>${suffixCase}</td>
                                    <td>${stemDifinition}</td>
                                </tr>
                                `;
                            helperFunctions.standard.insertTrIntoTableById('tbody', html);
                        }
                    }
                });

                //added div vv
                const particle = affixTypesMap.nounSuffixANDpPrefix.resultMap.particle[0].affix; //console.log(prefix);
                const map = ALL_WORDS.MAP[affixTypesMap.nounSuffixANDpPrefix.resultMap.particle[0].affix]; //console.log(map);
                const ppHtml = `
                    <table style="margin-top:35px">
                        <thead>
                            <tr>
                                <th>...</th>
                                <th style="width:116px">Prefix</th>
                                <th>Definition</th>
                                <th>Usage Notes</th>
                                <th>Wordclass</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>Info</th>
                                <td>${particle || '...'}</td>
                                <td>${map.definition || '...'}</td>
                                <td>${map.usage_notes || '...'}</td>
                                <td>${'particle'}</td>
                            </tr>
                        </tbody>
                    </table>
                `;

                const wrapper = document.getElementById('tablesContainer');
                helperFunctions.standard.createDivById('', wrapper, ppHtml);

                openPageOld('page96');
            }
            if (affixTypesMap.nounSuffixANDpSuffix.state) {
                console.log('--noun with particle suffix and suffix--');
                matchType = 2;


                const stemMap = ALL_WORDS.MAP[affixTypesMap.nounSuffixANDpSuffix.resultMap.suffix[0].affixStem] || []; console.log(stemMap);
                let stemDifinition = stemMap.definition || '...';
                const stemNotes = stemMap.usage_notes || '...';

                let wordclass = '';
                for (const key of Object.values(WORDCLASSES)) {
                    if (key.SHORT === 'n') { wordclass = key.NAME }
                };

                const html = `
                                <div>
                                    <table>
                                        <tr>
                                            <th style="width:116px">...</th>
                                            <th>Word</th>
                                            <th>Stem</th>
                                            <th>Wordclass</th>
                                            <th>Usage Notes</th>
                                        </tr>
                                        <tr>
                                            <th>Info</th>
                                            <td>${keyword}</td>
                                            <td id="type2SuffixONLYStem">${affixTypesMap.nounSuffixANDpSuffix.resultMap.suffix[0].affixStem}</td>
                                            <td>${wordclass}</td>
                                            <td>${stemNotes || '...'}</td>
                                        </tr>
                                    </table>
                                </div>
                                <br>
                                <br>
                                <br>
                                <div id=tablesContainer>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th style="width:116px">...</th>
                                                <th>Suffix</th>
                                                <th>Declension</th>
                                                <th>Gender</th>
                                                <th>Number</th>
                                                <th>Case</th>
                                                <th>Definition</th>
                                            </tr>
                                        </thead>
                                        <tbody id="tbody"></tbody>
                                    </table>
                                </div>
                                `;
                helperFunctions.standard.createPageById('page96', html);
                affixTypesMap.nounSuffixANDpSuffix.resultMap.suffix.forEach(arr => {
                    const suffixDeclension = arr.affixDeclension;
                    const suffixGender = arr.affixGender;
                    const suffixNumber = arr.affixNumber;
                    const suffixCase = arr.affixCase;
                    const suffix = arr.affix;

                    const combinedGendersObject = WORD_UTILS.combineGenders(stemMap.genders) // Key-value pairs
                    for (const [gndr, def] of Object.entries(combinedGendersObject)) {
                        if (gndr === suffixGender) {
                            stemDifinition = def;
                            //console.log(combinedGendersObject);
                            //console.log(gndr, def);

                            const html = `
                                <tr>
                                    <th>Info</th>
                                    <td>${suffix}</td>
                                    <td>${suffixDeclension}</td>
                                    <td>${suffixGender}</td>
                                    <td>${suffixNumber}</td>
                                    <td>${suffixCase}</td>
                                    <td>${stemDifinition}</td>
                                </tr>
                                `;
                            helperFunctions.standard.insertTrIntoTableById('tbody', html);
                        }
                    }
                });

                //added div vv
                const particle = affixTypesMap.nounSuffixANDpSuffix.resultMap.particle[0].affix; //console.log(prefix);
                const map = ALL_WORDS.MAP[affixTypesMap.nounSuffixANDpSuffix.resultMap.particle[0].affix]; //console.log(map);
                const ppHtml = `
                                <table style="margin-top:35px">
                                    <thead>
                                        <tr>
                                            <th>...</th>
                                            <th style="width:116px">Particle</th>
                                            <th>Definition</th>
                                            <th>Usage Notes</th>
                                            <th>Wordclass</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th>Info</th>
                                            <td>${particle || '...'}</td>
                                            <td>${map.definition || '...'}</td>
                                            <td>${map.usage_notes || '...'}</td>
                                            <td>${'preposition'}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            `;

                const wrapper = document.getElementById('tablesContainer');
                helperFunctions.standard.createDivById('', wrapper, ppHtml);

                openPageOld('page96');
            }
            if (affixTypesMap.adjSuffix.state) {
                matchType = 2;

                const html = `
                    <div>
                        <table>
                            <theader>
                                <tr>
                                    <th>Word</th>
                                    <th>Definition</th>
                                    <th>Usage Notes</th>
                                    <th>Wordclass</th>
                                </tr>
                            </theader>
                            <tbody>
                                <td>${keyword}</td>
                                <td>${ALL_WORDS.MAP[affixTypesMap.adjSuffix.resultMap[0].affixStem].definition}</td>
                                <td>${ALL_WORDS.MAP[affixTypesMap.adjSuffix.resultMap[0].affixStem].usage_notes || '...'}</td>
                                <td>${ALL_WORDS.MAP[affixTypesMap.adjSuffix.resultMap[0].affixStem].type}</td>
                            </tbody>
                        </table>
                    </div>
                    <div style="margin-top:15px">
                        <table>
                            <theader>
                                <tr>
                                    <th>Suffix</th>
                                    <th>Stem</th>
                                    <th>Declension</th>
                                    <th>Case</th>
                                    <th>Gender</th>
                                    <th>Number</th>
                                </tr>
                            </theader>
                            <tbody id="tbody"></tbody>
                        </table>
                    </div>
                `;
                helperFunctions.standard.createPageById('page96', html);
                affixTypesMap.adjSuffix.resultMap.forEach(entry => {
                    const html = `
                        <tr>
                            <td>${entry.affix}</td>
                            <td>${entry.affixStem}</td>
                            <td>${entry.affixDeclension}</td>
                            <td>${entry.affixCase}</td>
                            <td>${entry.affixGender}</td>
                            <td>${entry.affixNumber}</td>
                        </tr>
                    `;
                    helperFunctions.standard.insertTrIntoTableById('tbody', html);
                });
                openPageOld('page96');
            }
            if (affixTypesMap.adjSuffixANDpSuffix.state) {
                matchType = 2;

                const html = `
                    <div>
                        <table>
                            <theader>
                                <tr>
                                    <th>Word</th>
                                    <th>Definition</th>
                                    <th>Usage Notes</th>
                                    <th>Wordclass</th>
                                </tr>
                            </theader>
                            <tbody>
                                <td>${keyword}</td>
                                <td>${ALL_WORDS.MAP[affixTypesMap.adjSuffixANDpSuffix.resultMap.suffix[0].affixStem].definition}</td>
                                <td>${ALL_WORDS.MAP[affixTypesMap.adjSuffixANDpSuffix.resultMap.suffix[0].affixStem].usage_notes || '...'}</td>
                                <td>${ALL_WORDS.MAP[affixTypesMap.adjSuffixANDpSuffix.resultMap.suffix[0].affixStem].type}</td>
                            </tbody>
                        </table>
                    </div>
                    <div style="margin-top:15px">
                        <table>
                            <theader>
                                <tr>
                                    <th>Suffix</th>
                                    <th>Stem</th>
                                    <th>Declension</th>
                                    <th>Case</th>
                                    <th>Gender</th>
                                    <th>Number</th>
                                </tr>
                            </theader>
                            <tbody id="tbody"></tbody>
                        </table>
                        <table style="margin-top:15px">
                            <theader>
                                <tr>
                                    <th>Particle</th>
                                    <th>Stem</th>
                                    <th>Wordclass</th>
                                </tr>
                            </theader>
                            <tbody id="tbody2"></tbody>
                        </table>
                    </div>
                `;
                helperFunctions.standard.createPageById('page96', html);
                affixTypesMap.adjSuffixANDpSuffix.resultMap.suffix.forEach(entry => {
                    const html = `
                        <tr>
                            <td>${entry.affix}</td>
                            <td>${entry.affixStem}</td>
                            <td>${entry.affixDeclension}</td>
                            <td>${entry.affixCase}</td>
                            <td>${entry.affixGender}</td>
                            <td>${entry.affixNumber}</td>
                        </tr>
                    `;
                    helperFunctions.standard.insertTrIntoTableById('tbody', html);
                });
                affixTypesMap.adjSuffixANDpSuffix.resultMap.particle.forEach(entry => {
                    const html = `
                        <tr>
                            <td>${entry.affix}</td>
                            <td>${entry.affixStem}</td>
                            <td>${entry.affixType}</td>
                        </tr>
                    `;
                    helperFunctions.standard.insertTrIntoTableById('tbody2', html);
                });
                openPageOld('page96');
            }
            if (affixTypesMap.auxPrefix.state) {

                const array = affixTypesMap.auxPrefix.resultMap[0];
                const particle = array.affix;
                const particleStem = array.affixStem;

                const html = `
                    <div>
                        <table>
                            <theader>
                                <tr>
                                    <th>Word</th>
                                    <th>Definition</th>
                                    <th>Usage Notes</th>
                                    <th>Wordclass</th>
                                </tr>
                            </theader>
                            <tbody>
                                <tr>
                                    <td>${keyword}</td>
                                    <td>${ALL_WORDS.MAP[array.affixStem].definition}</td>
                                    <td>${ALL_WORDS.MAP[array.affixStem].usage_notes}</td>
                                    <td>${'Auxilary'}</td>
                                </tr>
                            </tbody>
                        </table>
                        <table style="margin-top:15px">
                            <theader>
                                <tr>
                                    <th>Prefix</th>
                                    <th>Stem</th>
                                    <th>Gender</th>
                                    <th>Person</th>
                                </tr>
                            </theader>
                            <tbody id="tbody"></tbody>
                        </table>
                    </div>
                `;
                helperFunctions.standard.createPageById('page96', html);
                affixTypesMap.auxPrefix.resultMap.forEach(entry => {
                    const html = `
                        <tr>
                            <td>${entry.affix}</td>
                            <td>${entry.affixStem}</td>
                            <td>${entry.affixGender}</td>
                            <td>${entry.affixPerson}</td>
                        </tr>
                    `;
                    helperFunctions.standard.insertTrIntoTableById('tbody', html);
                });
                openPageOld('page96');
            }
        }
        if (matchType === 3) {//type 3
            console.log('-----type3-----');
            const searchHandler = ALL_WORDS.fetchByDefinition(keyword); // Array[]
            console.log('3', 'searchHandler |', searchHandler);
            searchHandler.forEach(entry => {

                // check for type === "n" then do for () {} else do normal thingi?
                if (entry.type === "n") {
                    for (const [gender, def] of Object.entries(WORD_UTILS.combineGenders(entry.genders))) {
                        helperFunctions.matchtype3.extraTableRow(entry.word, `n ${entry.declension}`, gender, def, entry.usage_notes || '...');//TODO make <-- use insert tr instead of this goofy function.
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

        searchBTN = document.getElementById('search_button');
        searchFLD = document.getElementById('search_field');
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
        //console.log(searchBTN, searchFLD);
        console.log('all matches |', allMatchesArray);
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

// Wait until page99's controls exist before wiring up the dictionary logic.
(function bootstrapDictionaryPage() {
    if (window.__dictionaryPageInitPromise) return;

    const waitForSearchControls = () => Promise.all([
        helperFunctions.tablegen.waitForElement('#page99 #search_button', 604800000), //a week <--
        helperFunctions.tablegen.waitForElement('#page99 #search_field', 604800000),
    ]);

    window.__dictionaryPageInitPromise = waitForSearchControls()
        .then(() => {
            if (window.__dictionaryPageInitialized) return;
            dictionaryPage();
            window.__dictionaryPageInitialized = true;
        })
        .catch((error) => {
            console.warn('dictionaryPage bootstrap failed:', error);
            window.__dictionaryPageInitPromise = null;
        });
})();

//maybe add a 4th type? if number, then use lirioz' NUMBERS.numberToText.
//5th type is a buttonpress that just loads the entire plain dictionary.
//maybe need an entire 6th type just for lur?
//rest of particle suffixes.
//probably revert that change that codex added to page loading lmao. it fucks up when you re-enter the page - from a searchpage.
//auxilary can take verb prefixes.