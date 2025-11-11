const test = function test(word) {
    console.log(word);
}
const clearPageById = function clearPageById(id) {
    const page = document.getElementById(id);
    if (!page) return
    if (page) {
        page.remove();
        console.log('removed page by id: ' + id);
    }
}
const createPageById = function createPageById(id, html) {
    let page = document.getElementById(id);
    if (!page) {
        page = document.createElement('div');
    }

    page.id = id;
    page.className = 'page';
    page.innerHTML = html;

    const pagewrapper = document.querySelector('.pages');

    if (!pagewrapper) {
        console.error("no div with class '.pages'");
        return;
    }

    pagewrapper.appendChild(page);
}
const createDivById = function createDivById(id, wrapper, html) {
    let div = document.getElementById(id);
    if (!div) {
        div = document.createElement('div');
    }
    if (id.length > 0) {
        div.id = id;
    }
    div.innerHTML = html;

    const divwrapper = wrapper;

    if (!divwrapper) {
        console.error("no div wrapper");
        return;
    }

    divwrapper.appendChild(div);
}
const sliceKeywordNegative = function sliceKeywordNegative(keyword, x) {
    const slice1 = keyword.slice(0, -x);
    const slice2 = keyword.slice(-x);
    return { slice1, slice2 };

    // Example usage:
    //const { slice1, slice2 } = sliceKeyword("ækluu", 2);
    //console.log(slice1); // Output: ækl
    //console.log(slice2); // Output: uu
}
const sliceKeywordPositive = function sliceKeywordPositive(keyword, x) {
    const slice1 = keyword.slice(0, x);
    const slice2 = keyword.slice(x);
    return { slice1, slice2 };

    // Example usage:
    //const { slice1, slice2 } = sliceKeyword("ækluu", 2);
    //console.log(slice1); // Output: ækl
    //console.log(slice2); // Output: uu
}
const reverseSearchIdsOnSearch = function reverseSearchIdsOnSearch() {
    function swapSearchIds(idA, idB) {
        const a = document.getElementById(idA);
        const b = document.getElementById(idB);
        if (!a && !b) return;          // nothing to do
        if (!a && b) { b.id = idA; return; }
        if (a && !b) { a.id = idB; return; }

        // use a temporary id unlikely to collide
        const tmp = `__tmp_id_${Date.now()}_${Math.random().toString(36).slice(2)}`;
        a.id = tmp;        // step 1: move A out of the way
        b.id = idA;        // step 2: move B into A's original id
        const movedA = document.getElementById(tmp);
        if (movedA) movedA.id = idB; // step 3: restore A into B's original id
    }
    if (document.getElementById('search_button') && document.getElementById('unusedBtn')) {
        swapSearchIds('search_button', 'unusedBtn');
        swapSearchIds('search_field', 'unusedField');
    }
}
const insertTrIntoTableById = function insertTrIntoTableById(id, html) {
    let table = document.getElementById(id);
    if (!table) {
        console.warn(`no table by id ${id}`);
    }

    table.innerHTML = table.innerHTML + html;

}
const searchableTable = function searchableTable(wordclass) {//turns the tables into paramteres. such that the function becomes global and reusable.
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

const standard = {
    test,
    clearPageById,
    createPageById,
    createDivById,
    sliceKeywordNegative,
    sliceKeywordPositive,
    reverseSearchIdsOnSearch,
    insertTrIntoTableById,
    searchableTable
}

const affixChecker = function affixChecker(word, map, isPrefix, returnAll, resultArray) {

    resultArray.length = 0; // clear array first
    //console.log(WORD_UTILS.matchAffix(word, map, isPrefix, returnAll));

    let array = [];
    const match = WORD_UTILS.matchAffix(word, map, isPrefix, returnAll); 
    //console.log(match);
    if (Array.isArray(match)) {
        array = match[0] || {};
    } else if (match && typeof match === 'object') {
        array = match;
    } else {
        return;
    }

    //let xarray = WORD_UTILS.matchAffix(word, map, isPrefix, returnAll)[0] || WORD_UTILS.matchAffix(word, map, isPrefix, returnAll) || [];
    //console.log(array);
    if (!array) {
        return;
    }
    let affixType = array[3] || array.type;
    let affix = '';
    let affixPerson = '';
    let affixNumber = '';
    let affixGender = '';
    let affixDeclension = '';
    let affixCase = '';

    let affixStem = '';

    let definition = '';//if pp
    let usage_notes = '';//if pp

    //decide if applied or unapplied suffix is used
    function appliedOrUnapplied(applied, unapplied, affixType) {

        let affixUsed = '';

        if (affixType === 'suffix') {
            if (applied && unapplied) {
                if (word.endsWith(applied) && word.endsWith(unapplied)) {
                    affixUsed = applied;
                } else if (word.endsWith(unapplied)) {
                    affixUsed = unapplied;
                } else {
                    return null;
                }
            } else if (applied) {
                affixUsed = applied;
            }
            else if (unapplied) {
                affixUsed = unapplied;
            }
            if (!affixUsed) {
                return null;
            } else {
                affix = affixUsed;
            }
        } else if (affixType === 'prefix') {
            if (applied && unapplied) {
                if (word.startsWith(applied) && word.startsWith(unapplied)) {
                    affixUsed = applied;
                } else if (word.startsWith(unapplied)) {
                    affixUsed = unapplied;
                } else {
                    return null;
                }
            } else if (applied) {
                affixUsed = applied;
            }
            else if (unapplied) {
                affixUsed = unapplied;
            }
            if (!affixUsed) {
                return null;
            } else {
                affix = affixUsed;
            }
        }


    }

    switch (affixType) {
        case 'v':
            if (isPrefix === true) {
                verbPrefResult = [];
                match.forEach(arr => {
                    //console.log('arr | ', arr);

                    const affixApplied = arr[1][0] || '';
                    const affixUnapplied = arr[1][1] || '';

                    affixPerson = arr[2][0];
                    affixGender = arr[2][2];
                    affixNumber = arr[2][1][0];

                    appliedOrUnapplied(affixApplied, affixUnapplied, 'prefix');

                    const { slice1: V1, slice2: V2 } = helperFunctions.standard.sliceKeywordPositive(word, affix.length);
                    affixStem = V2;

                    let matchResult = {
                        affixType,
                        affixPerson,
                        affixGender,
                        affixNumber,
                        affixStem,
                        affix,
                    }
                    //console.log(matchResult);
                    verbPrefResult.push(matchResult);
                    //console.log(matchResult);
                    return matchResult;
                });
                //console.log('verbPrefResult | ', verbPrefResult);
                resultArray.push(...verbPrefResult); //console.log(resultArray, resultArray.length);
                return verbPrefResult;
            } else if (isPrefix === false) {
                verbSuffResult = [];
                match.forEach(arr => {
                    //console.log('arr | ', arr);

                    const affixApplied = arr[1][0] || '';
                    const affixUnapplied = arr[1][1] || '';

                    affixPerson = arr[2][0];
                    affixGender = arr[2][2];
                    affixNumber = arr[2][1][0];

                    appliedOrUnapplied(affixApplied, affixUnapplied, 'suffix');

                    const { slice1: V1, slice2: V2 } = helperFunctions.standard.sliceKeywordNegative(word, affix.length);
                    affixStem = V1;

                    let matchResult = {
                        affixType,
                        affixPerson,
                        affixGender,
                        affixNumber,
                        affixStem,
                        affix,
                    }

                    verbSuffResult.push(matchResult);
                    //console.log(matchResult);
                    return matchResult;
                });
                //console.log('verbSuffResult | ', verbSuffResult);
                resultArray.push(...verbSuffResult); //console.log(resultArray, resultArray.length);
                return verbSuffResult;
            }

            //console.log(affix, affixStem);
            break;
        case 'n':
            if (isPrefix === false) {
                nounSuffResult = [];
                match.forEach(arr => {
                    //console.log('arr | ', arr);

                    const affixApplied = arr[1][0] || '';
                    const affixUnapplied = arr[1][1] || '';

                    appliedOrUnapplied(affixApplied, affixUnapplied, 'suffix');

                    affixDeclension = arr[2][3][0];
                    affixCase = arr[2][0];
                    affixGender = arr[2][1];
                    affixNumber = arr[2][2][0];

                    //console.log(affix, affixDeclension, affixCase, affixGender, affixNumber, affix.length);
                    const { slice1: N1, slice2: N2 } = helperFunctions.standard.sliceKeywordNegative(word, affix.length);
                    affixStem = N1;
                    console.log(affixStem, ALL_WORDS.MAP[affixStem]);
                    const MAP = ALL_WORDS.MAP[affixStem];

                    if (MAP && MAP.type === 'adj') { affixType = 'adj' } else { return }//check if adj
                    const matchResult = {
                        affixType,
                        affixGender,
                        affixNumber,
                        affixDeclension,
                        affixStem,
                        affixCase,
                        affix,
                    }
                    if (ALL_WORDS.MAP[affixStem]) {//checks if the stem exists (doesnt return array for æfon for affix 'n' ex - æfu isnt a stemword)
                        nounSuffResult.push(matchResult);
                        return matchResult;
                    } else { return; }
                });
                console.log('nounSuffResult | ', nounSuffResult);
                resultArray.push(...nounSuffResult); console.log(resultArray, resultArray.length);
                return nounSuffResult;
            }
            break;
        case 'pp':
            affix = array.word || '';
            const { slice1: PP1, slice2: PP2 } = helperFunctions.standard.sliceKeywordPositive(word, affix.length);
            affixStem = PP2;

            //console.log(affix, affixStem);
            break;
        case 'adj'://unused
            if (isPrefix === false) {
                adjSuffResult = [];
                match.forEach(arr => {
                    //console.log('arr | ', arr);

                    const affixApplied = arr[1][0] || '';
                    const affixUnapplied = arr[1][1] || '';

                    appliedOrUnapplied(affixApplied, affixUnapplied, 'suffix');

                    affixDeclension = arr[2][3][0];
                    affixCase = arr[2][0];
                    affixGender = arr[2][1];
                    affixNumber = arr[2][2][0];

                    //console.log(affix, affixDeclension, affixCase, affixGender, affixNumber, affix.length);
                    const { slice1: N1, slice2: N2 } = helperFunctions.standard.sliceKeywordNegative(word, affix.length);
                    affixStem = N1;

                    const matchResult = {
                        affixType,
                        affixGender,
                        affixNumber,
                        affixDeclension,
                        affixStem,
                        affixCase,
                        affix,
                    }
                    if (ALL_WORDS.MAP[affixStem]) {//checks if the stem exists (doesnt return array for æfon for affix 'n' ex - æfu isnt a stemword)
                        adjSuffResult.push(matchResult);
                        return matchResult;
                    } else { return; }
                });
                console.log('adjSuffResult | ', adjSuffResult);
                resultArray.push(...adjSuffResult); console.log(resultArray, resultArray.length);
                return adjSuffResult;
            }
            break;
        default:
            console.warn(`${affixType} is not a valid affix type`);
    }
    const result = {
        affixType,
        affixPerson,
        affixGender,
        affixNumber,
        affixDeclension,
        affixStem,
        affixCase,
        affix,
    };

    if (Array.isArray(resultArray)) resultArray.push(result);
    return result;
}
const neoSuffixChecker = function neoSuffixChecker(keyword, map, resultArray) {
    resultArray.length = 0; // clear array first
    const array = WORD_UTILS.matchSuffix(keyword, map);
    if (!array) return null;

    const suffixes = array[0] || [];
    const Suffixtype = array[2];
    const Suffixperson = array[3];
    const Suffixgender = array[4];
    const Suffixnumber = array[5];
    const Suffixdeclensions = array[1] || [];

    const appliedSuffix = suffixes[0] || '';
    const unappliedSuffix = suffixes[1] || '';

    let usedSuffix = '';
    if (appliedSuffix && unappliedSuffix) {
        if (keyword.endsWith(appliedSuffix) && keyword.endsWith(unappliedSuffix)) {
            usedSuffix = appliedSuffix;
        } else if (keyword.endsWith(unappliedSuffix)) {
            usedSuffix = unappliedSuffix;
        } else return null;
    } else if (appliedSuffix) usedSuffix = appliedSuffix;
    else if (unappliedSuffix) usedSuffix = unappliedSuffix;
    if (!usedSuffix) return null;

    const suffixLength = usedSuffix.length;
    const { slice1, slice2 } = helperFunctions.standard.sliceKeywordNegative(keyword, suffixLength);
    const Suffixstem = slice1;

    const result = {
        Suffixtype,
        Suffixperson,
        Suffixgender,
        Suffixnumber,
        Suffixdeclensions,
        appliedSuffix,
        unappliedSuffix,
        usedSuffix,
        Suffixstem
    };

    // push into provided array if it is a real array
    if (Array.isArray(resultArray)) resultArray.push(result);

    // also return the result so caller can use it immediately
    return result;
}
const neoPrefixChecker = function neoPrefixChecker(keyword, map, resultArray) {
    resultArray.length = 0; // clear array first
    const array = WORD_UTILS.matchPrefix(keyword, map);
    console.log(array);
    if (!array) {
        return;
    }
    const prefix = array[0];
    //const Prefixtype = array[1];
    const Prefixperson = array[1];
    const Prefixgender = array[2];
    const Prefixnumber = array[3];
    const Prefixdeclension = array[1] || [];
    console.log(Prefixdeclension);

    console.log(
        'Prefixperson | ', Prefixperson,
        'Prefixgender | ', Prefixgender,
        'Prefixnumber | ', Prefixnumber
    )

    const usedPrefix = prefix; // no variants

    if (!usedPrefix) {
        return;
    }

    const prefixLength = usedPrefix.length;
    const { slice1, slice2 } = helperFunctions.standard.sliceKeywordPositive(keyword, prefixLength);
    const Prefixstem = slice2;
    console.log(prefix, usedPrefix); // worked earlier - havent changed anything:q


    const result = {
        Prefixperson,
        Prefixgender,
        Prefixnumber,
        Prefixdeclension,
        usedPrefix,
        Prefixstem,
        array
    }
    // push into provided array if it is a real array
    if (Array.isArray(resultArray)) resultArray.push(result);

    return result;
    //neoPrefixChecker('xenæf', VERBS.PREFIXES.FLAT_MATCHES);
}

const matchtype2 = {
    affixChecker,
}


const extraTableRow = function extraTableRow(word, declension, forms, defintion, notes) {
    // table row gen.
    let table = document.getElementById('dictionaryTable');
    if (!table) {
        table = document.createElement('table');
        table.id = 'dictionaryTable';
        const trh = document.createElement('tr');
        trh.innerHTML = `
                <th style="width:12%">Word</th>
                <th style="width:7%">Wordclass</th>
                <th style="width:7%">Forms</th>
                <th style="width:30%">Definition</th>
                <th style="width:30%">Notes</th>
                <th style="width:7%">...</th>
            `;
        table.appendChild(trh);
    }

    const Index = table.rows.length;
    //td rows
    const trd = document.createElement('tr');
    trd.innerHTML = `
            <td id="td1-${Index}">${word}</td>
            <td id="td2-${Index}">${declension}</td>
            <td id="td3-${Index}">${forms}</td>
            <td id="td4-${Index}">${defintion}</td>
            <td id="td5-${Index}">${notes}</td>
            <td id="td6-${Index}"; style="cursor:pointer"><strong>search</strong></td>
            `;

    trd.id = `trd-${Index}`;
    const td6 = trd.querySelector('td:last-child');
    const td1 = trd.querySelector('td:first-child');
    td6.addEventListener('click', () => search(td1.textContent));

    table.appendChild(trd);

    document.querySelector('#tableWrapper').appendChild(table);

    //console.log('index |', Index);

    // usage => for (let i = 0; i < rowAmount; i++) { extraTableRow(keyword or something custom); }
}

const matchtype3 = {
    extraTableRow,
}


const page97Base = function page97Base(word, wordclass) {
    let REGEX = /^[aeiouAEIOU]$/;
    let wordclass_article = '';
    const { slice1, slice2 } = helperFunctions.standard.sliceKeywordNegative(wordclass, (wordclass.length - 1));
    if (REGEX.test(slice1)) { wordclass_article = 'an'; } else { wordclass_article = 'a'; }
    //console.log(wordclass_article);

    let displayedWordclass = '';
    for (const key of Object.values(WORDCLASSES)) {
        if (key.SHORT === wordclass) {
            displayedWordclass = key.NAME;
            displayedWordclass = displayedWordclass.toLowerCase();
        }
    }
    let usedReferencePath = '';
    let usedReferencePageIndex = '';
    const localPageMap = {
        n: TABBAR_MAP.page3,
        v: TABBAR_MAP.page4,
        adv: TABBAR_MAP.page5,
        aux: TABBAR_MAP.page6,
        adj: TABBAR_MAP.page7,
        pp: TABBAR_MAP.page9,
    }
    for (const [index, map] of Object.entries(localPageMap)) {
        if (index === wordclass) {
            usedReferencePath = map.Path;
            usedReferencePageIndex = map.Page;
        }
    }

    const html = `
        <div class="outerdiv">
            <div id="leftdivdictionary" class="leftdivdictionary">
                <div class="keyworddiv"></div>
                <h2>
                    ${word}
                </h2>
                <p>${word} is ${wordclass_article} ${displayedWordclass}. Read more about ${displayedWordclass}s <a id='reference'>here</a>,
                or read the short outline in here.</p>
                <br><br>
                <p>The declention tables that would be relevant for ${word} can be seen bellow.</p>

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

    const reference = document.getElementById('reference');
    reference.href = '#';
    reference.onclick = function (ev) {
        ev.preventDefault();
        const tabElement = document.querySelector(`.tab-bar .tab:nth-child(${usedReferencePageIndex + 3})`);
        const elementToHighlight = tabElement || this;
        openPage(usedReferencePath, 'page' + usedReferencePageIndex, { runScripts: true, replace: false }, elementToHighlight);
        if (tabElement) tabElement.classList.add('active');
    }
}
const type1extraTableRow = function type1extraTableRow(word, declension, forms, definition, notes) {
    let table = document.getElementById('type1TopTable');
    if (!table) {
        table = document.createElement('table');
        table.id = 'type1TopTable';

        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        const headers = ["Word", "Declension", "Definition", "Forms", "Usage Notes", "Word Class"];
        headers.forEach(text => {
            const th = document.createElement('th');
            th.textContent = text;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        table.appendChild(tbody);
    }

    const tbody = table.querySelector('tbody');
    const row = document.createElement('tr');
    for (let i = 0; i < 6; i++) {
        const td = document.createElement('td');
        td.textContent = '...';
        row.appendChild(td);
    }
    if (tbody) {
        tbody.appendChild(row);
    }

    const cellValues = [word, declension, definition, forms, notes, '...'];
    cellValues.forEach((value, index) => {
        const td = row.children[index];
        if (td) {
            td.textContent = value || '...';
        }
    });

    const container = document.querySelector('.tablesContainer');
    if (container && !container.contains(table)) {
        container.appendChild(table);
    }

    return row;
}
const neoVerbTables = function neoVerbTables(affixState, word, wrapper) {

    const affixStateMap = {
        1: { 1: 'Prefix', 2: VERBS.PREFIXES.MAP },
        2: { 1: 'Suffix', 2: VERBS.SUFFIXES.MAP }
    }
    const html = `
        <table id="Verb-Table-${affixStateMap[affixState][1]}" style="margin-bottom: 10px;">
            <tr>
                <th colSpan = 2>${affixStateMap[affixState][1]}</th>
                <th>Exalted</th>
                <th>Rational</th>
                <th>Monstrous</th>
                <th>Irrational</th>
                <th>Magical</th>
                <th>Mundane</th>
                <th>Abstract</th>
            </tr>
            <tr>
                <th style = "width:86px" rowSpan = 3>Singular</th>
                <th style = "width:14px">1.</th>
                <td>${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][1].Singular['Exalted'], word, '')[0] : affixStateMap[affixState][2][1].Singular['Exalted']}</td>
                <td>${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][1].Singular['Rational'], word, '')[0] : affixStateMap[affixState][2][1].Singular['Rational']}</td>
                <td>${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][1].Singular['Monstrous'], word, '')[0] : affixStateMap[affixState][2][1].Singular['Monstrous']}</td>
                <td>${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][1].Singular['Irrational'], word, '')[0] : affixStateMap[affixState][2][1].Singular['Irrational']}</td>
                <td>${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][1].Singular['Magical'], word, '')[0] : affixStateMap[affixState][2][1].Singular['Magical']}</td>
                <td>${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][1].Singular['Mundane'], word, '')[0] : affixStateMap[affixState][2][1].Singular['Mundane']}</td>
                <td>${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][1].Singular['Abstract'], word, '')[0] : affixStateMap[affixState][2][1].Singular['Abstract']}</td>
            </tr>
            <tr>
                <th>2.</th>
                <td>${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][2].Singular['Exalted'], word, '')[0] : affixStateMap[affixState][2][2].Singular['Exalted']}</td>
                <td>${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][2].Singular['Rational'], word, '')[0] : affixStateMap[affixState][2][2].Singular['Rational']}</td>
                <td>${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][2].Singular['Monstrous'], word, '')[0] : affixStateMap[affixState][2][2].Singular['Monstrous']}</td>
                <td>${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][2].Singular['Irrational'], word, '')[0] : affixStateMap[affixState][2][2].Singular['Irrational']}</td>
                <td>${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][2].Singular['Magical'], word, '')[0] : affixStateMap[affixState][2][2].Singular['Magical']}</td>
                <td>${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][2].Singular['Mundane'], word, '')[0] : affixStateMap[affixState][2][2].Singular['Mundane']}</td>
                <td>${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][2].Singular['Abstract'], word, '')[0] : affixStateMap[affixState][2][2].Singular['Abstract']}</td>
            </tr>
            <tr>
                <th>3.</th>
                <td style = "border-bottom: 1px solid var(--border)">${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][3].Singular['Exalted'], word, '')[0] : affixStateMap[affixState][2][3].Singular['Exalted']}</td>
                <td style = "border-bottom: 1px solid var(--border)">${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][3].Singular['Rational'], word, '')[0] : affixStateMap[affixState][2][3].Singular['Rational']}</td>
                <td style = "border-bottom: 1px solid var(--border)">${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][3].Singular['Monstrous'], word, '')[0] : affixStateMap[affixState][2][3].Singular['Monstrous']}</td>
                <td style = "border-bottom: 1px solid var(--border)">${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][3].Singular['Irrational'], word, '')[0] : affixStateMap[affixState][2][3].Singular['Irrational']}</td>
                <td style = "border-bottom: 1px solid var(--border)">${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][3].Singular['Magical'], word, '')[0] : affixStateMap[affixState][2][3].Singular['Magical']}</td>
                <td style = "border-bottom: 1px solid var(--border)">${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][3].Singular['Mundane'], word, '')[0] : affixStateMap[affixState][2][3].Singular['Mundane']}</td>
                <td style = "border-bottom: 1px solid var(--border)">${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][3].Singular['Abstract'], word, '')[0] : affixStateMap[affixState][2][3].Singular['Abstract']}</td>
            </tr>
            <tr>
                <th rowSpan = 3>Dual</th>
                <th>1.</th>
                <td>${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][1].Dual['Exalted'], word, '')[0] : affixStateMap[affixState][2][1].Dual['Exalted']}</td>
                <td>${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][1].Dual['Rational'], word, '')[0] : affixStateMap[affixState][2][1].Dual['Rational']}</td>
                <td>${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][1].Dual['Monstrous'], word, '')[0] : affixStateMap[affixState][2][1].Dual['Monstrous']}</td>
                <td>${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][1].Dual['Irrational'], word, '')[0] : affixStateMap[affixState][2][1].Dual['Irrational']}</td>
                <td>${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][1].Dual['Magical'], word, '')[0] : affixStateMap[affixState][2][1].Dual['Magical']}</td>
                <td>${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][1].Dual['Mundane'], word, '')[0] : affixStateMap[affixState][2][1].Dual['Mundane']}</td>
                <td>${affixStateMap[affixState][2][1].Dual['Abstract']}</td>
            </tr>
            <tr>
                <th>2.</th>
                <td>${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][2].Dual['Exalted'], word, '')[0] : affixStateMap[affixState][2][2].Dual['Exalted']}</td>
                <td>${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][2].Dual['Rational'], word, '')[0] : affixStateMap[affixState][2][2].Dual['Rational']}</td>
                <td>${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][2].Dual['Monstrous'], word, '')[0] : affixStateMap[affixState][2][2].Dual['Monstrous']}</td>
                <td>${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][2].Dual['Irrational'], word, '')[0] : affixStateMap[affixState][2][2].Dual['Irrational']}</td>
                <td>${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][2].Dual['Magical'], word, '')[0] : affixStateMap[affixState][2][2].Dual['Magical']}</td>
                <td>${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][2].Dual['Mundane'], word, '')[0] : affixStateMap[affixState][2][2].Dual['Mundane']}</td>
                <td>${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][2].Dual['Abstract'], word, '')[0] : affixStateMap[affixState][2][2].Dual['Abstract']}</td>
            </tr>
            <tr>
                <th>3.</th>
                <td style = "border-bottom: 1px solid var(--border)">${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][3].Dual['Exalted'], word, '')[0] : affixStateMap[affixState][2][3].Dual['Exalted']}</td>
                <td style = "border-bottom: 1px solid var(--border)">${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][3].Dual['Rational'], word, '')[0] : affixStateMap[affixState][2][3].Dual['Rational']}</td>
                <td style = "border-bottom: 1px solid var(--border)">${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][3].Dual['Monstrous'], word, '')[0] : affixStateMap[affixState][2][3].Dual['Monstrous']}</td>
                <td style = "border-bottom: 1px solid var(--border)">${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][3].Dual['Irrational'], word, '')[0] : affixStateMap[affixState][2][3].Dual['Irrational']}</td>
                <td style = "border-bottom: 1px solid var(--border)">${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][3].Dual['Magical'], word, '')[0] : affixStateMap[affixState][2][3].Dual['Magical']}</td>
                <td style = "border-bottom: 1px solid var(--border)">${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][3].Dual['Mundane'], word, '')[0] : affixStateMap[affixState][2][3].Dual['Mundane']}</td>
                <td style = "border-bottom: 1px solid var(--border)">${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][3].Dual['Abstract'], word, '')[0] : affixStateMap[affixState][2][3].Dual['Abstract']}</td>
            </tr>
            <tr>
                <th rowSpan = 3>Plural</th>
                <th>1.</th>
                <td>${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][1].Plural['Exalted'], word, '')[0] : affixStateMap[affixState][2][1].Plural['Exalted']}</td>
                <td>${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][1].Plural['Rational'], word, '')[0] : affixStateMap[affixState][2][1].Plural['Rational']}</td>
                <td>${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][1].Plural['Monstrous'], word, '')[0] : affixStateMap[affixState][2][1].Plural['Monstrous']}</td>
                <td>${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][1].Plural['Irrational'], word, '')[0] : affixStateMap[affixState][2][1].Plural['Irrational']}</td>
                <td>${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][1].Plural['Magical'], word, '')[0] : affixStateMap[affixState][2][1].Plural['Magical']}</td>
                <td>${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][1].Plural['Mundane'], word, '')[0] : affixStateMap[affixState][2][1].Plural['Mundane']}</td>
                <td>${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][1].Plural['Abstract'], word, '')[0] : affixStateMap[affixState][2][1].Plural['Abstract']}</td>
            </tr>
            <tr>
                <th>2.</th>
                <td>${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][2].Plural['Exalted'], word, '')[0] : affixStateMap[affixState][2][2].Plural['Exalted']}</td>
                <td>${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][2].Plural['Rational'], word, '')[0] : affixStateMap[affixState][2][2].Plural['Rational']}</td>
                <td>${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][2].Plural['Monstrous'], word, '')[0] : affixStateMap[affixState][2][2].Plural['Monstrous']}</td>
                <td>${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][2].Plural['Irrational'], word, '')[0] : affixStateMap[affixState][2][2].Plural['Irrational']}</td>
                <td>${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][2].Plural['Magical'], word, '')[0] : affixStateMap[affixState][2][2].Plural['Magical']}</td>
                <td>${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][2].Plural['Mundane'], word, '')[0] : affixStateMap[affixState][2][2].Plural['Mundane']}</td>
                <td>${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][2].Plural['Abstract'], word, '')[0] : affixStateMap[affixState][2][2].Plural['Abstract']}</td>
            </tr>
            <tr>
                <th>3.</th>
                <td>${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][3].Plural['Exalted'], word, '')[0] : affixStateMap[affixState][2][3].Plural['Exalted']}</td>
                <td>${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][3].Plural['Rational'], word, '')[0] : affixStateMap[affixState][2][3].Plural['Rational']}</td>
                <td>${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][3].Plural['Monstrous'], word, '')[0] : affixStateMap[affixState][2][3].Plural['Monstrous']}</td>
                <td>${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][3].Plural['Irrational'], word, '')[0] : affixStateMap[affixState][2][3].Plural['Irrational']}</td>
                <td>${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][3].Plural['Magical'], word, '')[0] : affixStateMap[affixState][2][3].Plural['Magical']}</td>
                <td>${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][3].Plural['Mundane'], word, '')[0] : affixStateMap[affixState][2][3].Plural['Mundane']}</td>
                <td>${affixState === 1 ? WORD_UTILS.axifyVowelCouples(affixStateMap[affixState][2][3].Plural['Abstract'], word, '')[0] : affixStateMap[affixState][2][3].Plural['Abstract']}</td>
            </tr>
        </table>
        `;
    helperFunctions.standard.createDivById('', wrapper, html);
}
const neoNounTables = function neoNounTables(declension, mood, wrapper, combinedGendersObject) {
    const table = document.createElement('table');

    const moodMap = {
        1: 'Directive',
        2: 'Recessive'
    }
    table.id = `Noun-Table-${moodMap[mood]}`;
    //th
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headers = [moodMap[mood], "Singular", "Dual", "Plural"];
    headers.forEach(text => {
        const th = document.createElement('th');
        th.textContent = text;
        headerRow.appendChild(th);
        th.id = `neoSummaryHeader-${text}`;
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    //rows
    for (const [gender, def] of Object.entries(combinedGendersObject)) {
        const trd = document.createElement('tr');
        const rowth = document.createElement('th');
        rowth.textContent = gender;
        trd.appendChild(rowth);
        const map = {
            1: 'Singular',
            2: 'Dual',
            3: 'Plural'
        }

        for (let i = 0; i < (headers.length - 1); i++) {
            const td = document.createElement('td');
            td.textContent = 'placeholder';
            if (i === 0) {
                td.className = `neoSummarytd-${map[1]}`
            }
            else if (i === 1) {
                td.className = `neoSummarytd-${map[2]}`
            }
            else if (i === 2) {
                td.className = `neoSummarytd-${map[3]}`
            }
            const mooooood = moodMap[mood];
            //inner
            const entry = Object.entries(NOUNS.SUFFIXES.MAP[mooooood]);
            for (const [gndr, array] of entry) {
                if (gndr === gender) {
                    const numberKey = map[i + 1];
                    const cellValue = array[numberKey] && array[numberKey][declension];
                    if (cellValue !== undefined) {
                        td.textContent = cellValue;
                    }
                }
            }
            trd.appendChild(td);

        }
        table.appendChild(trd);
    }

    table.style = "margin-bottom: 10px";

    const tbody = document.createElement('tbody');
    table.appendChild(tbody);

    wrapper.appendChild(table);
}
const neoAdjectiveTables = function neoAdjectiveTables(declension, mood, wrapper) {
    const table = document.createElement('table');

    const moodMap = {
        1: 'Directive',
        2: 'Recessive'
    }
    table.id = `Adjective-Table-${moodMap[mood]}`;
    //th
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headers = [moodMap[mood], "Singular", "Dual", "Plural"];
    headers.forEach(text => {
        const th = document.createElement('th');
        th.textContent = text;
        headerRow.appendChild(th);
        th.id = `neoSummaryHeader-${text}`;
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    //rows
    GENDERS.FLAT.NAME.forEach(gender => {
        const trd = document.createElement('tr');
        const rowth = document.createElement('th');
        rowth.textContent = gender;
        trd.appendChild(rowth);
        const map = {
            1: 'Singular',
            2: 'Dual',
            3: 'Plural'
        }

        for (let i = 0; i < (headers.length - 1); i++) {
            const td = document.createElement('td');
            td.textContent = 'placeholder';
            if (i === 0) {
                td.className = `neoSummarytd-${map[1]}`
            }
            else if (i === 1) {
                td.className = `neoSummarytd-${map[2]}`
            }
            else if (i === 2) {
                td.className = `neoSummarytd-${map[3]}`
            }
            const mooooood = moodMap[mood];
            //inner
            const entry = Object.entries(NOUNS.SUFFIXES.MAP[mooooood]);
            for (const [gndr, array] of entry) {
                if (gndr === gender) {
                    const numberKey = map[i + 1];
                    const cellValue = array[numberKey] && array[numberKey][declension];
                    if (cellValue !== undefined) {
                        td.textContent = cellValue;
                    }
                }
            }
            trd.appendChild(td);

        }
        table.appendChild(trd);
    });

    table.style = "margin-bottom: 10px";

    const tbody = document.createElement('tbody');
    table.appendChild(tbody);

    wrapper.appendChild(table);
}
const neoAdverbTables = function neoAdverbTables(wrapper, word, definition, elative, notes, wordclass) {
    const table = document.createElement('table');

    const html = `
    <div>
        <table>
            <tr>
                <th>Word</th>
                <th>Definition</th>
                <th>Elative</th>
                <th>Usage Notes</th>
                <th>Wordclass</th>
            </tr>
            <tr>
                <td>${word}</td>
                <td>${definition}</td>
                <td>${elative || '...'}</td>
                <td>${notes}</td>
                <td>${wordclass}</td>
            </tr>
        </table>
    </div>
    `;

    helperFunctions.standard.createDivById('', wrapper, html);

    const tbody = document.createElement('tbody');
    table.appendChild(tbody);

    wrapper.appendChild(table);
}

const matchtype1 = {
    type1extraTableRow,
    neoVerbTables,
    neoNounTables,
    neoAdjectiveTables,
    neoAdverbTables,
    page97Base
}


const populateSummaryTables = function populateSummaryTables(keyword, tables) {
    Object.keys(tables).forEach(tableId => {
        const table = document.getElementById(tableId);
        if (!table) return;
        const tds = table.querySelectorAll("td");
        tds.forEach(td => {
            // prefer original stored raw suffix (data-raw) if present 
            const textInCell = (td.dataset.raw && td.dataset.raw.trim()) ? td.dataset.raw : td.textContent.trim();
            //console.log(td.dataset.raw); // wtf is dataset.raw?
            // console.log(td.innerHTML);

            // process raw
            let entries;
            if (tables[tableId]) entries = WORD_UTILS.connectSplit(textInCell, keyword, "");
            else entries = WORD_UTILS.connectSplit("", keyword, textInCell);
            td.innerHTML = `<strong>${CHARACTERS.entriesToText(entries[0])}</strong>${CHARACTERS.entriesToText(entries[1])}<strong>${CHARACTERS.entriesToText(entries[2])}</strong>`;
            // place keyword as prefix or suffix (you can change behavior per table)
        });
    });
}
const waitForElement = function waitForElement(selector, timeout = 5000) {
    return new Promise((resolve, reject) => {
        const startTime = Date.now();

        function check() {
            const element = document.querySelector(selector);
            if (element) {
                resolve(element);
            } else if (Date.now() - startTime > timeout) {
                reject(new Error(`Element ${selector} not found within ${timeout}ms`));
            } else {
                setTimeout(check, 50);
            }
        }

        check();
    });
}

const tablegen = {
    populateSummaryTables,
    waitForElement
}


const keepDigitsOnly = function keepDigitsOnly(str) {
    return String(str).replace(/\D+/g, "");
}
const removeParensSpacesAndDigits = function removeParensSpacesAndDigits(str) {
    return String(str || "").replace(/[\d() \t\r\n]+/g, "");
}

const formatting = {
    keepDigitsOnly,
    removeParensSpacesAndDigits
}



const helperFunctions =
{
    standard,
    matchtype3,
    matchtype2,
    matchtype1,
    tablegen,
    formatting
}
