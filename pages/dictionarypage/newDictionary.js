function dictionaryPage() {
    // /\(/o.o\)/\ - Spooky the spider
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
                                function shortpath() {
                                    const tempArray = [];

                                    const mapArray = [IDS.NUMBERS, IDS.CASE];
                                    mapArray.forEach(el => {
                                        //tempArray.push(el);
                                        for (const [short, long] of Object.entries(el)) {
                                            if (caseKey === long) {
                                                tempArray.push(short);
                                            }
                                            if (numberKey === long) {
                                                tempArray.push(short);
                                            }
                                        }
                                    });
                                    for (entry of Object.values(GENDERS.MAP)) {
                                        if (entry.NAME === genderKey) {
                                            tempArray.push(entry.SHORT);
                                        }
                                    }
                                    const result = `pers.${tempArray[2]}.${tempArray[1]}.${personKey}.${tempArray[0]}`;//type.gender.number.person.case
                                    //console.log(tempArray);
                                    return result;
                                }
                                const result = {
                                    path: {
                                        gender: genderKey,
                                        number: numberKey,
                                        person: personKey,
                                        case: caseKey,
                                    },
                                    word: caseValue,
                                    type: 'personal',
                                    path_short: shortpath() || '',
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
            for (const [genderKey, genderMap] of Object.entries(DICTIONARY.DETERMINERS.IRREGULARS.MAP)) {
                for (const [typeKey, typeMap] of Object.entries(genderMap)) {
                    for (const [numberKey, numberValue] of Object.entries(typeMap)) {
                        if (numberValue === word) {
                            matchType = 1.2;
                            function shortpath() {
                                const tempArray = [];

                                const mapArray = [IDS.NUMBERS, IDS.DET_TYPES];
                                mapArray.forEach(el => {
                                    //tempArray.push(el);
                                    for (const [short, long] of Object.entries(el)) {
                                        if (numberKey === long) {
                                            tempArray.push(short);
                                        }
                                        if (typeKey === long) {
                                            tempArray.push(short);
                                        }
                                    }
                                });
                                for (entry of Object.values(GENDERS.MAP)) {
                                    if (entry.NAME === genderKey) {
                                        tempArray.push(entry.SHORT);
                                    }
                                }
                                const result = `${tempArray[1]}.${tempArray[0]}.${tempArray[2]}`;//type.number.gender

                                return result;
                            }
                            const result = {
                                path: {
                                    gender: genderKey,
                                    number: numberKey,
                                },
                                word: numberValue,
                                type: typeKey,
                                path_short: shortpath() || '',
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
                            function shortpath() {
                                const tempArray = [];

                                const mapArray = [IDS.CASE, IDS.COR_TYPES];
                                mapArray.forEach(el => {
                                    //tempArray.push(el);
                                    for (const [short, long] of Object.entries(el)) {
                                        if (caseKey === long) {
                                            tempArray.push(short);
                                        }
                                        if (typeKey === long) {
                                            tempArray.push(short);
                                        }
                                    }
                                });
                                for (entry of Object.values(GENDERS.MAP)) {
                                    if (entry.NAME === genderKey) {
                                        tempArray.push(entry.SHORT);
                                    }
                                }
                                const result = `${tempArray[1]}.${tempArray[0]}.${tempArray[2]}`;//type.case.gender

                                return result;
                            }
                            const result = {
                                path: {
                                    gender: genderKey,
                                    case: caseKey,
                                },
                                word: caseValue,
                                type: typeKey,
                                path_short: shortpath() || '',
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

                                    function shortpath() {
                                        const tempArray = [];

                                        const mapArray = [IDS.ASPECT, IDS.NUMBERS, IDS.TENSE];
                                        mapArray.forEach(el => {
                                            //tempArray.push(el);
                                            for (const [short, long] of Object.entries(el)) {
                                                if (aspectKey === long) {
                                                    tempArray.push(short);
                                                }
                                                if (tenseKey === long) {
                                                    tempArray.push(short);
                                                }
                                                if (numberKey === long) {
                                                    tempArray.push(short);
                                                }
                                            }
                                        });
                                        for (entry of Object.values(GENDERS.MAP)) {
                                            if (entry.NAME === genderKey) {
                                                tempArray.push(entry.SHORT);
                                            }
                                        }
                                        const result = `${tempArray[0]}.${tempArray[3]}.${tempArray[1]}.${personKey}.${tempArray[2]}`;//aspect.gender.number.person.tense.

                                        return result;
                                    }
                                    const result = {
                                        path: {
                                            aspect: aspectKey,
                                            tense: tenseKey,
                                            gender: genderKey,
                                            person: personKey,
                                            number: numberKey
                                        },
                                        path_short: shortpath() || '',
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
            verbPrefix: helperFunctions.matchtype2.neoAffixChecker(keyword, DICTIONARY.VERBS.PREFIXES.MATCHES, true) || [],
            ppPrefix: helperFunctions.matchtype2.neoAffixChecker(keyword, DICTIONARY.PREPOSITIONS.MAP, true) || [],
            verbSuffix: helperFunctions.matchtype2.neoAffixChecker(keyword, DICTIONARY.VERBS.SUFFIXES.MATCHES, false) || [],
            nounSuffix: helperFunctions.matchtype2.neoAffixChecker(keyword, DICTIONARY.NOUNS.SUFFIXES.MATCHES, false) || [],
            adjSuffix: helperFunctions.matchtype2.neoAffixChecker(keyword, DICTIONARY.ADJECTIVES.SUFFIXES.MATCHES, false) || [],
            pPrefix: helperFunctions.matchtype2.neoAffixChecker(keyword, DICTIONARY.PARTICLES.MAP, true) || [],
            pSuffix: helperFunctions.matchtype2.neoAffixChecker(keyword, DICTIONARY.PARTICLES.MAP, false) || [],
            auxPrefix: helperFunctions.matchtype2.neoAffixChecker(keyword, DICTIONARY.VERBS.PREFIXES.MATCHES, true) || [],
            detSuffix: [], //<---
        }
        console.log(type2AffixesMap);

        const pagesToClear = ['page97', 'page95', 'page96', 'dictionaryTable'];
        for (const page of pagesToClear) {
            helperFunctions.standard.clearPageById(page);
            //console.log(`page by id ${page} has been cleared`);
        }
        /*
            helperFunctions.standard.clearPageById('page97'); //type 1
            helperFunctions.standard.clearPageById('page95'); //type 1.1
            helperFunctions.standard.clearPageById('page96'); //type 2
            helperFunctions.standard.clearPageById('dictionaryTable'); //type 3
        */
        if (//type 1
            DICTIONARY.ALL_WORDS.MAP[keyword] && DICTIONARY.ALL_WORDS.MAP[keyword].word.length > 0
        ) {
            matchType = 1;
            console.log('-----type1-----');
            const searchHandler = DICTIONARY.ALL_WORDS.fetch(keyword);
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
                            entry.path_short = "stem";
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
                            entry.path_short = "stem";
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
                            entry.path_short = "stem";
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
                                helperFunctions.matchtype1.neoVerbTables(true, keyword, AUXwrapper);
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
                            console.log('clean match |', keyword);
                            entry.path_short = "stem";

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
                            console.log('clean match |', keyword);
                            entry.path_short = "stem";


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
                                                <td>${DICTIONARY.DETERMINERS.SUFFIXES.MAP.Exalted}</td>
                                                <td>${DICTIONARY.DETERMINERS.SUFFIXES.MAP.Rational}</td>
                                                <td>${DICTIONARY.DETERMINERS.SUFFIXES.MAP.Monstrous}</td>
                                                <td>${DICTIONARY.DETERMINERS.SUFFIXES.MAP.Irrational}</td>
                                                <td>${DICTIONARY.DETERMINERS.SUFFIXES.MAP.Magical}</td>
                                                <td>${DICTIONARY.DETERMINERS.SUFFIXES.MAP.Mundane}</td>
                                                <td>${DICTIONARY.DETERMINERS.SUFFIXES.MAP.Abstract}</td>
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
                        const NcombinedGendersObject = GENDERS.combine(entry.genders) // Key-value pairs
                        if (word === keyword) {
                            console.log('clean match |', keyword);
                            entry.path_short = "stem";


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
                            console.log('clean match |', keyword);
                            entry.path_short = "stem";
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
                            console.log('clean match |', keyword);
                            entry.path_short = "stem";
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
                            entry.path_short = "stem";
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
                                //console.log(DICTIONARY.NOUNS.SUFFIXES.MAP);
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
                                helperFunctions.matchtype1.neoVerbTables(true, keyword, Vwrapper);
                                helperFunctions.matchtype1.neoVerbTables(false, keyword, Vwrapper);

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
                    helperFunctions.standard.openPageById('page97');
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
            helperFunctions.standard.openPageById('page95');
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
                                <th>Determiner</th>
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
            helperFunctions.standard.openPageById('page95');
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
                                <th>Correlative</th>
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
            helperFunctions.standard.openPageById('page95');
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
            helperFunctions.standard.openPageById('page95');
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
                adjSuffixANDpPrefix: { resultMap: { particle: [], suffix: [], }, state: false },
            }
            //console.log(affixTypesMap);
            allMatchesArray.type2 = affixTypesMap;


            //array / data update vv //make matchtype = 2 inside here vv. later do if matchtype === 2, createpagebyid, then each indivual if ...state, creates extra row on that page?
            if (affixTypesMap.verbPrefix.rawMap.arrayLength) {
                for (const entries of Object.values(affixTypesMap.verbPrefix.rawMap)) {
                    //console.log(entries);
                    for (const entry of Object.values(entries)) {
                        if (typeof (entry) === 'object') {
                            //    console.log(entry);

                            if (DICTIONARY.ALL_WORDS.MAP[entry.stem].type === 'v') {
                                //     console.log(entry);
                                affixTypesMap.verbPrefix.resultMap.push(entry);
                                affixTypesMap.verbPrefix.state = true;
                            } else {
                                verbSuffix = helperFunctions.matchtype2.neoAffixChecker(entry.stem, DICTIONARY.VERBS.SUFFIXES.MATCHES, false) || [];
                                if (verbSuffix.arrayLength > 0) {
                                    for (const entries2 of Object.values(verbSuffix)) {
                                        for (const entry2 of Object.values(entries2)) {
                                            console.log(entry);
                                            if (DICTIONARY.ALL_WORDS.MAP[entry2.stem].type === 'v') {

                                                entry.stem = entry2.stem;//fix affixStem for prefix.

                                                affixTypesMap.verbBothAffixes.resultMap.suffix.push(entry2);
                                                affixTypesMap.verbBothAffixes.state = true;
                                            }
                                        }
                                    }
                                    affixTypesMap.verbBothAffixes.resultMap.prefix.push(entry); //push prefix result outside of loop
                                }
                            }
                        }
                    }
                }
            }
            if (affixTypesMap.verbSuffix.rawMap.arrayLength) {
                for (const entries of Object.values(affixTypesMap.verbSuffix.rawMap)) {
                    for (const entry of Object.values(entries)) {
                        if (DICTIONARY.ALL_WORDS.MAP[entry.stem].type === 'v') {
                            affixTypesMap.verbSuffix.resultMap.push(entry);
                            affixTypesMap.verbSuffix.state = true;
                        }
                    }
                }
            }
            if (affixTypesMap.nounSuffix.rawMap.arrayLength) {
                for (const entries of Object.values(affixTypesMap.nounSuffix.rawMap)) {
                    for (const entry of Object.values(entries)) {

                        //console.log(entry);
                        if (DICTIONARY.ALL_WORDS.MAP[entry.stem] && entry.wordclass === 'n') {
                            affixTypesMap.nounSuffix.resultMap.push(entry);
                            affixTypesMap.nounSuffix.state = true;
                        } else {
                            pSuffix = helperFunctions.matchtype2.neoAffixChecker(entry.stem, DICTIONARY.PARTICLES.MAP, true) || [];
                            for (const entries2 of Object.values(pSuffix)) {
                                for (const entry2 of Object.values(entries2)) {
                                    if (DICTIONARY.ALL_WORDS.MAP[entry2.stem] && entry.wordclass === 'n') {

                                        entry.stem = entry2.stem;//fix affixStem for prefix.

                                        affixTypesMap.nounSuffixANDpSuffix.resultMap.particle.push(entry2);
                                        affixTypesMap.nounSuffixANDpSuffix.resultMap.suffix.push(entry);
                                        affixTypesMap.nounSuffixANDpSuffix.state = true;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (affixTypesMap.ppPrefix.rawMap.arrayLength) {
                for (const entries of Object.values(affixTypesMap.ppPrefix.rawMap)) {
                    for (const entry of Object.values(entries)) {
                        if (DICTIONARY.ALL_WORDS.MAP[entry.stem]) {
                            affixTypesMap.ppPrefix.resultMap.push(entry);
                            affixTypesMap.ppPrefix.state = true;
                        } else {
                            nounSuffix = helperFunctions.matchtype2.neoAffixChecker(entry.stem, DICTIONARY.NOUNS.SUFFIXES.MATCHES, false) || [];
                            if (nounSuffix.arrayLength > 0) {
                                affixTypesMap.nounSuffixANDppPrefix.resultMap.preposition.push(entry);
                                for (obj of Object.values(nounSuffix)) {
                                    entry.stem = obj.stem; //fix stem.
                                    affixTypesMap.nounSuffixANDppPrefix.resultMap.suffix.push(obj);
                                }
                                affixTypesMap.nounSuffixANDppPrefix.state = true;
                            }
                        }
                    }
                }
            }
            if (affixTypesMap.pPrefix.rawMap.arrayLength) {
                for (const entries of Object.values(affixTypesMap.pPrefix.rawMap)) {
                    for (const entry of Object.values(entries)) {
                        if (DICTIONARY.ALL_WORDS.MAP[entry.stem]) {
                            affixTypesMap.pPrefix.resultMap.push(entry);
                            affixTypesMap.pPrefix.state = true;
                        } else {
                            nounSuffix = helperFunctions.matchtype2.neoAffixChecker(entry.stem, DICTIONARY.NOUNS.SUFFIXES.MATCHES, false) || [];
                            //console.log(nounSuffix);
                            if (nounSuffix.arrayLength > 0) {
                                for (const entry2 of Object.values(nounSuffix)) {
                                    //console.log(obj)
                                    if (typeof (entry2) === 'object') {
                                        entry.stem = entry2[0].stem; //fix stem.
                                        console.log(entry, entry2);
                                        affixTypesMap.nounSuffixANDpPrefix.resultMap.suffix.push(entry2);
                                    }
                                }
                                affixTypesMap.nounSuffixANDpPrefix.resultMap.particle.push(entry);
                                affixTypesMap.nounSuffixANDpPrefix.state = true;
                            }
                        }
                    }
                }
            }
            if (affixTypesMap.pSuffix.rawMap.arrayLength) {//<-- surely wont work. need to have nounSuffixANDpSuffix logic inside nounsuffix logic. actually, double check the order of suffix/part as human mentioned it...
                for (const entries of Object.values(affixTypesMap.pSuffix.rawMap)) {
                    for (const entry of Object.values(entries)) {
                        if (DICTIONARY.ALL_WORDS.MAP[entry.stem]) {
                            affixTypesMap.pSuffix.resultMap.push(entry);
                            affixTypesMap.pSuffix.state = true;
                        } else {
                            nounSuffix = helperFunctions.matchtype2.neoAffixChecker(entry.stem, DICTIONARY.NOUNS.SUFFIXES.MATCHES, false) || [];
                            if (nounSuffix.arrayLength > 0) {
                                affixTypesMap.nounSuffixANDpSuffix.resultMap.particle.push(entry);
                                for (obj of Object.values(nounSuffix)) {
                                    entry.stem = obj.stem; //fix stem.
                                    affixTypesMap.nounSuffixANDpSuffix.resultMap.suffix.push(obj);
                                }
                                affixTypesMap.nounSuffixANDpSuffix.state = true;
                            }
                        }
                    }
                }
            }
            if (affixTypesMap.adjSuffix.rawMap.arrayLength) {
                for (const entries of Object.values(affixTypesMap.adjSuffix.rawMap)) {
                    for (const entry of Object.values(entries)) {
                        if (DICTIONARY.ALL_WORDS.MAP[entry.stem]) {
                            affixTypesMap.adjSuffix.resultMap.push(entry);
                            affixTypesMap.adjSuffix.state = true;
                        } else {
                            pPrefix = helperFunctions.matchtype2.neoAffixChecker(entry.stem, DICTIONARY.PARTICLES.MAP, true) || [];
                            for (const entries2 of Object.values(pPrefix)) {
                                for (const entry2 of Object.values(entries2)) {
                                    entry.stem = entry2.stem;//fix affixStem for prefix.
                                    if (DICTIONARY.ALL_WORDS.MAP[entry2.stem]) {

                                        affixTypesMap.adjSuffixANDpPrefix.resultMap.particle.push(entry2);
                                        affixTypesMap.adjSuffixANDpPrefix.resultMap.suffix.push(entry);
                                        affixTypesMap.adjSuffixANDpPrefix.state = true;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (affixTypesMap.auxPrefix.rawMap.arrayLength) {
                for (const entries of Object.values(affixTypesMap.auxPrefix.rawMap)) {
                    for (const entry of Object.values(entries)) {
                        if (DICTIONARY.ALL_WORDS.MAP[entry.stem] && DICTIONARY.ALL_WORDS.MAP[entry.stem].type === 'aux') {
                            affixTypesMap.auxPrefix.resultMap.push(entry);
                            affixTypesMap.auxPrefix.state = true;
                        }
                    }
                }
            }
            console.log(allMatchesArray);

            //page logic vv
            if (affixTypesMap.verbPrefix.state) {
                console.log('--verb prefix--');
                matchType = 2;
                helperFunctions.standard.clearPageById('page96');

                const stemMap = DICTIONARY.ALL_WORDS.MAP[affixTypesMap.verbPrefix.resultMap[0].stem] || [];
                const definition = stemMap.definition || '...';
                const notes = stemMap.usage_notes || '...';

                let wordclass = '';
                for (const key of Object.values(WORDCLASSES)) {
                    if (key.SHORT === 'v') { wordclass = key.NAME }
                };

                const html = `
                    <div>
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
                                    <td id="stem">${affixTypesMap.verbPrefix.resultMap[0].stem}</td>
                                    <td>${wordclass}</td>
                                    <td>${definition}</td>
                                    <td>${notes || '...'}</td>
                                </tr>
                            </table>
                        </div>
                        <div id="verbTableWrapper" style="margin-top:10px"></div>
                        <div id="suffixtable" style="margin-top:50px"></div>
                    </div>
                `;
                helperFunctions.standard.createPageById('page96', html);
                const verbTableWrapper = document.getElementById('verbTableWrapper');
                if (verbTableWrapper) {
                    for (const result of affixTypesMap.verbPrefix.resultMap) {
                        const path = result.path;
                        helperFunctions.standard.resultTables.verbTable(result.prefix, path.gender, path.number, path.person, verbTableWrapper, 'Prefix');
                    }
                }
                const stemSTd = document.querySelector('#stem');
                if (stemSTd) {
                    stemSTd.style.cursor = 'pointer';
                    stemSTd.addEventListener('click', () => {
                        keyword = affixTypesMap.verbPrefix.resultMap[0].stem;
                        search(keyword);
                    });
                }
                const wrapper = document.getElementById('suffixtable');
                if (wrapper) {
                    helperFunctions.matchtype1.neoVerbTables(false, keyword, wrapper);

                    helperFunctions.tablegen.populateSummaryTables(keyword, { 'Verb-Table-Prefix': true, 'Verb-Table-Suffix': false });
                }

                helperFunctions.standard.openPageById('page96');
            }
            else if (affixTypesMap.verbSuffix.state) {
                console.log('--verb suffix--');
                matchType = 2;
                helperFunctions.standard.clearPageById('page96');

                const stemMap = DICTIONARY.ALL_WORDS.MAP[affixTypesMap.verbSuffix.resultMap[0].stem] || [];
                const definition = stemMap.definition || '...';
                const notes = stemMap.usage_notes || '...';

                let wordclass = '';
                for (const key of Object.values(WORDCLASSES)) {
                    if (key.SHORT === 'v') { wordclass = key.NAME }
                }; //console.log(wordclass);

                const html = `
                    <div>
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
                                    <td id="stem">${affixTypesMap.verbSuffix.resultMap[0].stem}</td>
                                    <td>${wordclass}</td>
                                    <td>${definition}</td>
                                    <td>${notes || '...'}</td>
                                </tr>
                            </table>
                        </div>
                        <div id="verbTableWrapper" style="margin-top:10px"></div>
                        <div id="suffixtable" style="margin-top:50px"></div>
                    </div>
                `;
                helperFunctions.standard.createPageById('page96', html);
                const verbTableWrapper = document.getElementById('verbTableWrapper');
                if (verbTableWrapper) {
                    for (const result of affixTypesMap.verbSuffix.resultMap) {
                        const path = result.path;
                        helperFunctions.standard.resultTables.verbTable(result.suffix, path.gender, path.number, path.person, verbTableWrapper, 'Suffix');
                    }
                }
                const stemSTd = document.querySelector('#stem');
                if (stemSTd) {
                    stemSTd.style.cursor = 'pointer';
                    stemSTd.addEventListener('click', () => {
                        keyword = affixTypesMap.verbSuffix.resultMap[0].stem;
                        search(keyword);
                    });
                }
                const suffixtable = document.getElementById('suffixtable');
                if (suffixtable) {
                    helperFunctions.matchtype1.neoVerbTables(true, keyword, suffixtable);

                    helperFunctions.tablegen.populateSummaryTables(keyword, { 'Verb-Table-Prefix': true, 'Verb-Table-Suffix': false });
                }
                helperFunctions.standard.openPageById('page96');
            }
            else if (affixTypesMap.verbBothAffixes.state) {
                console.log('--both verb affixes--');
                matchType = 2;
                helperFunctions.standard.clearPageById('page96');


                const stemMap = DICTIONARY.ALL_WORDS.MAP[affixTypesMap.verbBothAffixes.resultMap.prefix[0].stem] || [];
                const definition = stemMap.definition || '...';
                const notes = stemMap.usage_notes || '...';

                let wordclass = '';
                for (const key of Object.values(WORDCLASSES)) {
                    if (key.SHORT === 'v') { wordclass = key.NAME }
                };

                const html = `
                    <div>
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
                                    <td id="stem">${affixTypesMap.verbBothAffixes.resultMap.prefix[0].stem}</td>
                                    <td>${wordclass}</td>
                                    <td>${definition}</td>
                                    <td>${notes || '...'}</td>
                                </tr>
                            </table>
                        </div>
                        <div id="prefixVerbTableWrapper"></div>
                        <div id="suffixVerbTableWrapper"></div>
                    </div>
                `;
                helperFunctions.standard.createPageById('page96', html);
                const prefixVerbTableWrapper = document.getElementById('prefixVerbTableWrapper');
                const suffixVerbTableWrapper = document.getElementById('suffixVerbTableWrapper');
                for (const result of affixTypesMap.verbBothAffixes.resultMap.prefix) {
                    //console.log(result);
                    const path = result.path;
                    helperFunctions.standard.resultTables.verbTable(result.prefix, path.gender, path.number, path.person, prefixVerbTableWrapper, 'Prefix');
                }
                for (const result of affixTypesMap.verbBothAffixes.resultMap.suffix) {
                    //console.log(result);
                    const path = result.path;
                    helperFunctions.standard.resultTables.verbTable(result.suffix, path.gender, path.number, path.person, suffixVerbTableWrapper, 'Suffix');
                }

                const stemSTd = document.querySelector('#stem');
                if (stemSTd) {
                    stemSTd.style.cursor = 'pointer';
                    stemSTd.addEventListener('click', () => {
                        keyword = affixTypesMap.verbBothAffixes.resultMap.prefix[0].stem; //console.log(keyword);
                        search(keyword);
                    });
                }

                helperFunctions.standard.openPageById('page96');
            }
            else if (affixTypesMap.nounSuffix.state) {
                console.log('--noun suffix--');
                matchType = 2;
                helperFunctions.standard.clearPageById('page96');


                const stemMap = DICTIONARY.ALL_WORDS.MAP[affixTypesMap.nounSuffix.resultMap[0].stem] || [];
                const notes = stemMap.usage_notes || '...';

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
                                <td id="stem">${affixTypesMap.nounSuffix.resultMap[0].stem}</td>
                                <td>${wordclass}</td>
                                <td>${notes}</td>
                            </tr>
                        </table>
                    </div>
                    <div id="nounTable"></div>
                `;
                helperFunctions.standard.createPageById('page96', html);
                const nounTable = document.getElementById('nounTable');
                for (const result of affixTypesMap.nounSuffix.resultMap) {
                    function definition() {
                        const entry = DICTIONARY.ALL_WORDS.MAP[affixTypesMap.nounSuffix.resultMap[0].stem];
                        for (const [gender, def] of Object.entries(entry.genders)) {
                            if (gender === path.gender) {
                                return def;
                            }
                        }
                    }
                    const path = result.path;
                    helperFunctions.standard.resultTables.nounTable(result.suffix, path.declension, path.gender, path.number, path.case, definition(), nounTable, 'suffix');
                }
                const stemTd = document.querySelector('#stem');
                if (stemTd) {
                    stemTd.style.cursor = 'pointer';
                    stemTd.addEventListener('click', () => {
                        keyword = affixTypesMap.nounSuffix.resultMap[0].affixStem;
                        search(keyword);
                    });
                }
                helperFunctions.standard.openPageById('page96');
            }
            else if (affixTypesMap.ppPrefix.state) {
                console.log('--prepositional prefix--');
                matchType = 2;
                helperFunctions.standard.clearPageById('page96');



                const stemMap = DICTIONARY.ALL_WORDS.MAP[affixTypesMap.ppPrefix.resultMap[0].stem] || [];
                const notes = stemMap.usage_notes || '...';
                const stem = affixTypesMap.ppPrefix.resultMap[0].stem;

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
                                <th>Declension</th>
                                <th>Wordclass</th>
                                <th>Definition</th>
                                <th>Usage Notes</th>
                            </tr>
                            <tr>
                                <th>Info</th>
                                <td>${keyword}</td>
                                <td id="stem">${stem}</td>
                                <td>${DICTIONARY.ALL_WORDS.MAP[stem].declension}</td>
                                <td>${wordclass}</td>
                                <td id="definition">${'placeholder'}</td>
                                <td>${notes}</td>
                            </tr>
                        </table>
                    </div>
                    <div id="prepositionTableWrapper" style="margin-bottom:25px"></div>
                    <div id="prepositionTableSuffixes"></div>
                `;
                helperFunctions.standard.createPageById('page96', html);
                const deftd = document.getElementById('definition');
                deftd.innerHTML = defsToSingleString(stemMap.genders);
                const prepositionTableWrapper = document.getElementById('prepositionTableWrapper');

                for (const result of affixTypesMap.ppPrefix.resultMap) {
                    const resultMap = DICTIONARY.ALL_WORDS.MAP[result.prefix];
                    helperFunctions.standard.resultTables.prepositionTable(result.prefix, resultMap.definition, resultMap.usage_notes || '...', prepositionTableWrapper);
                }

                const suffixesWrapper = document.getElementById('prepositionTableSuffixes');

                helperFunctions.matchtype1.neoNounTables(stemMap.declension, 1, suffixesWrapper, stemMap.genders);
                helperFunctions.matchtype1.neoNounTables(stemMap.declension, 2, suffixesWrapper, stemMap.genders);

                helperFunctions.tablegen.populateSummaryTables(keyword, { 'Noun-Table-Directive': false, 'Noun-Table-Recessive': false });

                helperFunctions.standard.openPageById('page96');
            }
            else if (affixTypesMap.nounSuffixANDppPrefix.state) {
                console.log('--noun with pp and suffix--');
                matchType = 2;
                helperFunctions.standard.clearPageById('page96');

                const stem = affixTypesMap.nounSuffixANDppPrefix.resultMap.suffix[0].stem;
                const stemMap = DICTIONARY.ALL_WORDS.MAP[stem] || [];
                const notes = stemMap.usage_notes || '...';

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
                                <td id="stem">${stem}</td>
                                <td>${wordclass}</td>
                                <td>${notes || '...'}</td>
                            </tr>
                        </table>
                    </div>
                    <div id="prepositionTableWrapper"></div>
                    <div id="suffixTableWrapper"></div>
                `;
                helperFunctions.standard.createPageById('page96', html);

                const ppWrapper = document.getElementById('prepositionTableWrapper');
                for (const result of affixTypesMap.nounSuffixANDppPrefix.resultMap.preposition) {
                    console.log(result);
                    const def = DICTIONARY.ALL_WORDS.MAP[result.prefix].definition;
                    const notes = DICTIONARY.ALL_WORDS.MAP[result.prefix].usage_notes;
                    helperFunctions.standard.resultTables.prepositionTable(result.prefix, def, notes || '...', ppWrapper);


                }
                const suffixWrapper = document.getElementById('suffixTableWrapper');
                for (const entries of affixTypesMap.nounSuffixANDppPrefix.resultMap.suffix) {
                    for (const result of Object.values(entries)) {
                        //console.log(result);
                        function definition() {
                            const entry = DICTIONARY.ALL_WORDS.MAP[result.stem];
                            for (const [gender, def] of Object.entries(entry.genders)) {
                                if (gender === path.gender) {
                                    return def;
                                }
                            }
                        }
                        const path = result.path;
                        helperFunctions.standard.resultTables.nounTable(result.suffix, path.declension, path.gender, path.number, path.case, definition(), suffixWrapper, 'suffix');
                    }
                }
                helperFunctions.standard.openPageById('page96');
            }
            else if (affixTypesMap.pPrefix.state) {
                console.log('--noun with particle--');
                matchType = 2;
                helperFunctions.standard.clearPageById('page96');

                if (affixTypesMap.pPrefix.resultMap[0].prefix != 'i') { //<--
                    const msg = `${affixTypesMap.pPrefix.resultMap[0].prefix} is not available as a noun prefix`;
                    console.warn(msg);
                    alert(msg);
                    return;
                }
                let wordclass = '';
                for (const key of Object.values(WORDCLASSES)) {
                    if (key.SHORT === 'n' || key.SHORT === 'adj') { wordclass = key.NAME }
                };
                const stem = affixTypesMap.pPrefix.resultMap[0].stem;
                const stemMap = DICTIONARY.ALL_WORDS.MAP[stem] || [];
                const notes = stemMap.usage_notes || '...';

                if (DICTIONARY.ALL_WORDS.MAP[stem]) {
                    console.log('clean match');

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
                                <tbody>
                                    <tr>
                                        <th>Info</th>
                                        <td>${stem}</td>
                                        <td>${stemMap.declension}</td>
                                        <td id="definition">${'placeholder'}</td>
                                        <td>${notes}</td>
                                        <td>${wordclass}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div id="particleTableWrapper"></div>
                        <div style="margin-top:50px" id="suffixTableWrapper"></div>
                    `;
                    helperFunctions.standard.createPageById('page96', html);

                    const deftd = document.getElementById('definition');
                    deftd.innerHTML = defsToSingleString(stemMap.genders);


                    const particleTableWrapper = document.getElementById('particleTableWrapper');
                    for (const result of affixTypesMap.pPrefix.resultMap) {
                        //console.log(result);
                        const particleMap = DICTIONARY.ALL_WORDS.MAP[result.prefix];
                        helperFunctions.standard.resultTables.particleTable(result.prefix, particleMap.definition, particleMap.usage_notes, particleTableWrapper);
                    }

                    const suffixTableWrapper = document.getElementById('suffixTableWrapper');
                    helperFunctions.matchtype1.neoNounTables(stemMap.declension, 1, suffixTableWrapper, stemMap.genders);
                    helperFunctions.matchtype1.neoNounTables(stemMap.declension, 2, suffixTableWrapper, stemMap.genders);
                    helperFunctions.tablegen.populateSummaryTables(keyword, { 'Noun-Table-Directive': false, 'Noun-Table-Recessive': false });

                    helperFunctions.standard.openPageById('page96');
                }
            }
            else if (affixTypesMap.pSuffix.state) {
                console.log('--p suffix--');
                matchType = 2;
                helperFunctions.standard.clearPageById('page96');

                const suffix = affixTypesMap.pSuffix.resultMap[0].suffix;
                if (suffix != 'ān' || suffix != 'ōn' || suffix != 'ūn' || suffix != 'ûl' || suffix != 'nyl') { //<--
                    const msg = `${suffix} is not available as a noun prefix`;
                    console.warn(msg);
                    alert(msg);
                    return;
                }
                let wordclass = '';
                for (const key of Object.values(WORDCLASSES)) {
                    if (key.SHORT === 'n' || key.SHORT === 'adj') { wordclass = key.NAME }
                };
                const stem = affixTypesMap.pSuffix.resultMap[0].stem;
                const stemMap = DICTIONARY.ALL_WORDS.MAP[stem] || [];
                const notes = stemMap.usage_notes || '...';


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
                            <tbody>
                                <tr>
                                    <th>Info</th>
                                    <td>${stem}</td>
                                    <td>${stemMap.declension}</td>
                                    <td id="definition">${'placeholder'}</td>
                                    <td>${notes}</td>
                                    <td id="wordclass">${wordclass}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div id="particleTableWrapper"></div>
                    <div style="margin-top:50px" id="suffixTableWrapper"></div>
                `;
                helperFunctions.standard.createPageById('page96', html);

                const deftd = document.getElementById('definition');
                if (stemMap.type === 'n') {
                    deftd.innerHTML = defsToSingleString(stemMap.genders);
                } else deftd.innerHTML = stemMap.definition;
                const particleTableWrapper = document.getElementById('particleTableWrapper');
                for (const result of affixTypesMap.pSuffix.resultMap) {
                    //console.log(result);
                    const particleMap = DICTIONARY.ALL_WORDS.MAP[result.suffix];
                    helperFunctions.standard.resultTables.particleTable(result.suffix, particleMap.definition, particleMap.usage_notes, particleTableWrapper);
                    console.log(stemMap, result)
                    if (stemMap.type === 'adj' && result.suffix === 'nyl') {
                        const wordclasstd = document.getElementById('wordclass');
                        wordclasstd.textContent = 'Adverb';
                    }
                }

                const suffixTableWrapper = document.getElementById('suffixTableWrapper');
                if (stemMap.type === 'n') {
                    helperFunctions.matchtype1.neoNounTables(stemMap.declension, 1, suffixTableWrapper, stemMap.genders);
                    helperFunctions.matchtype1.neoNounTables(stemMap.declension, 2, suffixTableWrapper, stemMap.genders);
                    helperFunctions.tablegen.populateSummaryTables(keyword, { 'Noun-Table-Directive': false, 'Noun-Table-Recessive': false });
                } else if (stemMap.type === 'adj') {
                    helperFunctions.matchtype1.neoAdjectiveTables(stemMap.declension, 1, suffixTableWrapper);
                    helperFunctions.matchtype1.neoAdjectiveTables(stemMap.declension, 2, suffixTableWrapper);
                    helperFunctions.tablegen.populateSummaryTables(keyword, { 'Adjective-Table-Directive': false, 'Adjective-Table-Recessive': false });
                }

                helperFunctions.standard.openPageById('page96');
            }
            else if (affixTypesMap.nounSuffixANDpPrefix.state) {
                console.log('--noun with particle prefix and suffix--');
                matchType = 2;
                helperFunctions.standard.clearPageById('page96');


                const stem = affixTypesMap.nounSuffixANDpPrefix.resultMap.suffix[0][0].stem;
                const stemMap = DICTIONARY.ALL_WORDS.MAP[stem] || [];
                let definition = stemMap.definition || '...';
                const notes = stemMap.usage_notes || '...';

                let wordclass = '';
                for (const key of Object.values(WORDCLASSES)) {
                    if (key.SHORT === 'n') { wordclass = key.NAME }
                };
                if (affixTypesMap.nounSuffixANDpPrefix.resultMap.particle[0].prefix != 'i') { //<--
                    const msg = `${affixTypesMap.nounSuffixANDpPrefix.resultMap.particle[0].affix} is not available as a noun prefix`;
                    console.warn(msg);
                    alert(msg);
                    return;
                }
                const html = `
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>...</th>
                                    <th>Stem</th>
                                    <th>Declension</th>
                                    <th>Usage_Notes</th>
                                    <th>Wordclass</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>Info</th>
                                    <td>${stem}</td>
                                    <td>${stemMap.declension}</td>
                                    <td>${notes}</td>
                                    <td>${wordclass}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div id="particleTableWrapper"></div>
                    <div id="suffixTableWrapper"></div>
                `;
                helperFunctions.standard.createPageById('page96', html);

                const particleTableWrapper = document.getElementById('particleTableWrapper');
                for (const result of affixTypesMap.nounSuffixANDpPrefix.resultMap.particle) {
                    const particleMap = DICTIONARY.ALL_WORDS.MAP[result.prefix];
                    helperFunctions.standard.resultTables.particleTable(result.prefix, particleMap.definition, particleMap.usage_notes, particleTableWrapper);
                }
                const suffixTableWrapper = document.getElementById('suffixTableWrapper');
                for (const results of affixTypesMap.nounSuffixANDpPrefix.resultMap.suffix) {
                    for (const result of results) {

                        function definition() {//<-- universalise this function?...
                            const entry = DICTIONARY.ALL_WORDS.MAP[result.stem];
                            for (const [gender, def] of Object.entries(entry.genders)) {
                                if (gender === path.gender) {
                                    return def;
                                }
                            }
                        }
                        const path = result.path;
                        helperFunctions.standard.resultTables.nounTable(result.suffix, path.declension, path.gender, path.number, path.case, definition(), suffixTableWrapper, 'suffix');
                    }
                }

                helperFunctions.standard.openPageById('page96');
            }//<-- this is where i got to:)
            else if (affixTypesMap.nounSuffixANDpSuffix.state) {
                console.log('--noun with particle suffix and suffix--');
                matchType = 2;
                helperFunctions.standard.clearPageById('page96');


                const stemMap = DICTIONARY.ALL_WORDS.MAP[affixTypesMap.nounSuffixANDpSuffix.resultMap.suffix[0].affixStem] || []; console.log(stemMap);
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

                    const combinedGendersObject = GENDERS.combine(stemMap.genders) // Key-value pairs
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
                const map = DICTIONARY.ALL_WORDS.MAP[affixTypesMap.nounSuffixANDpSuffix.resultMap.particle[0].affix]; //console.log(map);
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

                helperFunctions.standard.openPageById('page96');
            }
            else if (affixTypesMap.adjSuffix.state) {
                matchType = 2;
                helperFunctions.standard.clearPageById('page96');

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
                                <td>${DICTIONARY.ALL_WORDS.MAP[affixTypesMap.adjSuffix.resultMap[0].affixStem].definition}</td>
                                <td>${DICTIONARY.ALL_WORDS.MAP[affixTypesMap.adjSuffix.resultMap[0].affixStem].usage_notes || '...'}</td>
                                <td>${DICTIONARY.ALL_WORDS.MAP[affixTypesMap.adjSuffix.resultMap[0].affixStem].type}</td>
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
                helperFunctions.standard.openPageById('page96');
            }
            else if (affixTypesMap.adjSuffixANDpSuffix.state) {
                matchType = 2;
                helperFunctions.standard.clearPageById('page96');

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
                                <td>${DICTIONARY.ALL_WORDS.MAP[affixTypesMap.adjSuffixANDpSuffix.resultMap.suffix[0].affixStem].definition}</td>
                                <td>${DICTIONARY.ALL_WORDS.MAP[affixTypesMap.adjSuffixANDpSuffix.resultMap.suffix[0].affixStem].usage_notes || '...'}</td>
                                <td>${DICTIONARY.ALL_WORDS.MAP[affixTypesMap.adjSuffixANDpSuffix.resultMap.suffix[0].affixStem].type}</td>
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
                helperFunctions.standard.openPageById('page96');
            }
            else if (affixTypesMap.auxPrefix.state) {
                matchType = 2;
                helperFunctions.standard.clearPageById('page96');
                const array = affixTypesMap.auxPrefix.resultMap[0];

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
                                    <td>${DICTIONARY.ALL_WORDS.MAP[array.affixStem].definition}</td>
                                    <td>${DICTIONARY.ALL_WORDS.MAP[array.affixStem].usage_notes}</td>
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
                helperFunctions.standard.openPageById('page96');
            }
        }
        return;
        if (matchType === 3) {//type 3
            console.log('-----type3-----');
            const searchHandler = DICTIONARY.ALL_WORDS.fetchByDefinition(keyword); // Array[]
            console.log('3', 'searchHandler |', searchHandler);
            searchHandler.forEach(entry => {

                // check for type === "n" then do for () {} else do normal thingi?
                if (entry.type === "n") {
                    for (const [gender, def] of Object.entries(GENDERS.combine(entry.genders))) {
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

        console.log('all matches |', allMatchesArray);

        helperFunctions.tablegen.waitForElement(".page #listDiv", 99999).then(listDiv => {
            helperFunctions.final.displayForms(allMatchesArray);
            //console.log('done', listDiv);
        });

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
dictionaryPage();

/*
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
*/
//maybe add a 4th type? if number, then use lirioz' NUMBERS.numberToText.
//5th type is a buttonpress that just loads the entire plain dictionary.
//make 'short_path's //make every array, atleast inside allMatchesArray, have similar formatting - path{} etc.