function dictionaryPage() {//TODO finally add more wordclasses to type1/type2. not only verbs & nouns :sob:
    // /\(/o.o\)/\ - Spooky the spider

    let searchBTN = document.getElementById('search_button');
    let searchFLD = document.getElementById('search_field');

    // main search function
    function search(word) {

        let matchType = 3 //asume its type3, if its not then we change it - type3 detection is if(matchType === 3).

        searchBTN = document.getElementById('search_button');
        searchFLD = document.getElementById('search_field');

        if (searchFLD.value.length === 0) { return; }//doesnt search if searchFLD is empty

        let keyword = ((searchFLD && searchFLD.value ? searchFLD.value.trim() : '').toLowerCase()) || word;
        console.log('keyword |', keyword);

        // for type2
        //let prefixData = [];
        //let suffixData = [];
        let verbSuffixData = []; //should remove these as necesary - not needed since i use return result. can be done as seen bellow.
        let verbPrefixData = [];
        let nounSuffixData = [];
        let ppPrefixData = [];
        let adjSuffixData = [];

        let verbPrefix = helperFunctions.matchtype2.affixChecker(keyword, VERBS.PREFIXES.FLAT_MATCHES, true, true, verbPrefixData) || [];
        let ppPrefix = helperFunctions.matchtype2.affixChecker(keyword, PREPOSITIONS.MAP, true, true, ppPrefixData) || [];
        let verbSuffix = helperFunctions.matchtype2.affixChecker(keyword, VERBS.SUFFIXES.FLAT_MATCHES, false, true, verbSuffixData) || [];
        let nounSuffix = helperFunctions.matchtype2.affixChecker(keyword, NOUNS.SUFFIXES.FLAT_MATCHES, false, true, nounSuffixData) || [];
        let adjSuffix = helperFunctions.matchtype2.affixChecker(keyword, ADJECTIVES.SUFFIXES.FLAT_MATCHES, false, true, adjSuffixData) || [];

        let verbBothAffixes = {
            prefix: [],
            suffix: [],
        }
        let nounSuffixANDppPrefix = {
            prefix: [],
            suffix: [],
        }

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

        if (//type 1
            ALL_WORDS.fetch(keyword) && ALL_WORDS.fetch(keyword).length > 0
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
                                    helperFunctions.standard.searchableTable(wordclass);
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
                                    helperFunctions.standard.searchableTable('v');
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
                                    helperFunctions.standard.searchableTable(wordclass);
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
        else if (//type 2
            verbPrefix || ppPrefix || verbSuffix || nounSuffix || adjSuffix
        ) {
            console.log('-----type2-----');

            const affixTypesMap = {
                verbPrefix: { rawMap: verbPrefix, resultMap: [], state: false },
                verbSuffix: { rawMap: verbSuffix, resultMap: [], state: false },
                nounSuffix: { rawMap: nounSuffix, resultMap: [], state: false },
                ppPrefix: { rawMap: ppPrefix, resultMap: [], state: false },
                adjSuffix: { rawMap: adjSuffix, resultMap: [], state: false },
                verbBothAffixes: { resultMap: verbBothAffixes, state: false },
                nounSuffixANDppPrefix: { resultMap: nounSuffixANDppPrefix, state: false }
            }
            console.log(affixTypesMap);

            //array / data update vv
            if (affixTypesMap.verbPrefix.rawMap) {
                for (entry of Object.values(affixTypesMap.verbPrefix.rawMap)) {
                    //console.log(entry);
                    if (ALL_WORDS.MAP[entry.affixStem]) {
                        affixTypesMap.verbPrefix.resultMap.push(entry);
                        affixTypesMap.verbPrefix.state = true;
                    } else {
                        verbSuffix = helperFunctions.matchtype2.affixChecker(entry.affixStem, VERBS.SUFFIXES.FLAT_MATCHES, false, true, verbSuffixData) || [];
                        if (verbSuffix) {
                            for (entry2 of Object.values(verbSuffix)) {
                                if (ALL_WORDS.MAP[entry2.affixStem]) {
                                    console.log(entry);
                                    console.log(entry2);

                                    entry.affixStem = entry2.affixStem;//fix affixStem for prefix.

                                    verbBothAffixes.prefix.push(entry);
                                    verbBothAffixes.suffix.push(entry2);
                                    affixTypesMap.verbBothAffixes.state = true;
                                }
                            }
                        }
                        //console.log(verbSuffix);
                    }
                }
                //console.log(verbPrefix);
            }
            if (affixTypesMap.verbSuffix.rawMap) {
                for (entry of Object.values(affixTypesMap.verbSuffix.rawMap)) {
                    //console.log(entry);
                    if (ALL_WORDS.MAP[entry.affixStem]) {
                        affixTypesMap.verbSuffix.resultMap.push(entry);
                        affixTypesMap.verbSuffix.state = true;
                    }
                }
            }
            if (affixTypesMap.nounSuffix.rawMap) {
                for (entry of Object.values(affixTypesMap.nounSuffix.rawMap)) {
                    //console.log(entry);
                    if (ALL_WORDS.MAP[entry.affixStem]) {
                        affixTypesMap.nounSuffix.resultMap.push(entry);
                        affixTypesMap.nounSuffix.state = true;
                    }
                }
            }
            if (affixTypesMap.ppPrefix.rawMap) {

                const entry = affixTypesMap.ppPrefix.rawMap;
                //console.log(entry);

                if (ALL_WORDS.MAP[entry.affixStem]) {
                    affixTypesMap.ppPrefix.resultMap.push(entry);
                    affixTypesMap.ppPrefix.state = true;
                } else {
                    affixTypesMap.nounSuffixANDppPrefix.state = true;

                    nounSuffix = helperFunctions.matchtype2.affixChecker(entry.affixStem, NOUNS.SUFFIXES.FLAT_MATCHES, false, true, nounSuffixData) || [];
                    affixTypesMap.nounSuffixANDppPrefix.resultMap.prefix.push(entry);
                    for (obj of Object.values(nounSuffix)) {
                        entry.affixStem = obj.affixStem; //fix stem.
                        affixTypesMap.nounSuffixANDppPrefix.resultMap.suffix.push(obj);
                    }
                }
            }

            //page logic vv
            if (affixTypesMap.verbPrefix.state) {
                console.log('--verb prefix--');


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

                matchType = 2;
                openPageOld('page96');
                return;
            }
            if (affixTypesMap.verbSuffix.state) {
                console.log('--verb suffix--');


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

                    matchType = 2;
                    openPageOld('page96');
                    return;
                }

                matchType = 2;
                openPageOld('page96');
                return;
            }
            if (affixTypesMap.verbBothAffixes.state) {
                console.log('--both verb affixes--');

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
                return;
            }
            if (affixTypesMap.nounSuffix.state) {
                console.log('--noun suffix--');


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

                matchType = 2;
                openPageOld('page96');
                return;
            }
            if (affixTypesMap.ppPrefix.state) {
                console.log('--prepositional prefix--');


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

                    matchType = 2;
                    openPageOld('page96');
                    return;
                }
            }
            if (affixTypesMap.nounSuffixANDppPrefix.state) {
                console.log('--noun with pp and suffix--');


                console.log('has multiple noun suffixes');

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

                matchType = 2;
                openPageOld('page96');
                return;
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

//maybe add a 4th type? if number, then use lirioz' NUMBERS.numberToText.