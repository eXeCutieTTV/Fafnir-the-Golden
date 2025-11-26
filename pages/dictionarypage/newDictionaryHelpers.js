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

    const divWrapper = document.createElement('div');//for css
    divWrapper.id = "divWrapper";
    divWrapper.style.display = "flex";

    const leftDiv = document.createElement('div');
    leftDiv.id = `${id}.leftDiv`;
    leftDiv.style.display = "inline";
    leftDiv.style.flex = "0.8";
    leftDiv.style.marginRight = "20px";
    leftDiv.innerHTML = html;

    const rightDiv = document.createElement('div');
    rightDiv.id = `listDiv`;
    rightDiv.style.display = "inline";
    rightDiv.style.flex = "0.2";
    rightDiv.innerHTML = '';

    divWrapper.appendChild(leftDiv);
    divWrapper.appendChild(rightDiv);

    page.appendChild(divWrapper);

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
    return table;
}
const betterTrInsert = function betterTrInsert(id, html) {
    const tbody = document.getElementById(id);
    const tr = document.createElement('tr');
    tr.innerHTML = String(html);
    tbody.appendChild(tr);
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
    searchableTable,
    betterTrInsert
}

const shorten_path = function shorten_path(wordclass, {
    aspect = 'Episodic',
    number = null,
    tense = 'Non-Past',
    gender = null,
    person = null,
    Case = null,
    declension = null
} = {}) {
    let result;
    const tempArray = [];
    switch (wordclass) {
        case 'v':
            //console.log(aspect, number, tense, gender, person);

            const mapArrayV = [IDS.ASPECT, IDS.NUMBERS, IDS.TENSE];
            mapArrayV.forEach(el => {
                for (const [short, long] of Object.entries(el)) {
                    if (aspect === long) {
                        tempArray.push(short);
                    }
                    if (tense === long) {
                        tempArray.push(short);
                    }
                    if (number === long) {
                        tempArray.push(short);
                    }
                }
            });

            for (entry of Object.values(GENDERS.MAP)) {
                if (entry.NAME === gender) {
                    tempArray.push(entry.SHORT);
                }
            }
            result = `${tempArray[0]}.${tempArray[3]}.${tempArray[1]}.${person}.${tempArray[2]}`;//aspect.gender.number.person.tense.
            break;
        case 'adj':
        case 'n':
            //console.log(declension, gender, Case, number);

            const mapArrayN = [IDS.MOODS, IDS.NUMBERS];
            for (el of mapArrayN) {
                for (const [short, long] of Object.entries(el)) {
                    if (number === long) {
                        tempArray.push(short);
                    }
                    if (Case === long) {
                        tempArray.push(short);
                    }
                }
            }

            for (entry of Object.values(GENDERS.MAP)) {
                if (entry.NAME === gender) {
                    tempArray.push(entry.SHORT);
                }
            }
            result = `${declension}.${tempArray[0]}.${tempArray[2]}.${tempArray[1]}`;//declension.case.gender.number
            break;
    }

    return result;
}

const neoAffixChecker = function neoAffixChecker(word, map, isPrefix = false) {
    let tempArray = [];
    //decide if applied or unapplied suffix is used
    function appliedOrUnapplied(applied, unapplied, affixType) {
        let affixUsed = '';

        if (affixType === 'suffix') {
            if (applied && unapplied) {
                if (word.endsWith(applied)) {
                    affixUsed = applied;
                }
                else if (word.endsWith(unapplied)) {
                    affixUsed = unapplied;
                }
                else {
                    return null;
                }
            }
            else if (applied) {
                affixUsed = applied;
            }
            else if (unapplied) {
                affixUsed = unapplied;
            }
            if (!affixUsed) {
                return null;
            }
            else {
                return affixUsed;
            }
        } else if (affixType === 'prefix') {
            if (applied && unapplied) {
                if (word.startsWith(applied)) {
                    affixUsed = applied;
                }
                else if (word.startsWith(unapplied)) {
                    affixUsed = unapplied;
                }
                else {
                    return null;
                }
            }
            else if (applied) {
                affixUsed = applied;
            }
            else if (unapplied) {
                affixUsed = unapplied;
            }
            if (!affixUsed) {
                return null;
            }
            else {
                return affixUsed;
            }
        }
    }

    let arrayPrefixes;
    let arraySuffixes;
    let wordclass;
    let temp;
    isPrefix
        ? temp = AFFIXES.PREFIXES.match(word, map, false)
        : temp = AFFIXES.SUFFIXES.match(word, map, false);

    let bool;

    if (temp.type) {
        arrayPrefixes = AFFIXES.PREFIXES.match(word, map, false);
        bool = true;
    } else {
        arrayPrefixes = AFFIXES.PREFIXES.match(word, map, true);
        bool = false;
    }

    bool
        ? wordclass = arrayPrefixes.type
        : wordclass = arrayPrefixes[0][3];

    console.log(wordclass);
    switch (wordclass) {
        case 'v':
            if (isPrefix) {
                for (entries of arrayPrefixes) {
                    const paths = entries[1];
                    const prefix = appliedOrUnapplied(entries[2][0], entries[2][1] || "doesn't distinguish", 'prefix');
                    const { slice1: usedPrefix, slice2: stem } = helperFunctions.standard.sliceKeywordPositive(word, prefix.length);

                    if (DICTIONARY.ALL_WORDS.MAP[stem] && prefix === usedPrefix) {
                        for (const path of paths) {
                            console.log('path |', path);
                            const result = {
                                path: {
                                    person: path[0],
                                    number: path[1],
                                    gender: path[2],
                                },
                                stem: stem,
                                prefix: prefix,
                                affixState: 'prefix',
                                wordclass: 'v',
                                short_path: helperFunctions.formatting.shorten_path('v', { number: path[1], person: path[0], gender: path[2] })
                            }
                            tempArray[stem] ? null : tempArray[stem] = [];
                            tempArray[stem].push(result);
                            tempArray.length++;
                        }
                    }
                }
            } else {
                console.log(arraySuffixes);
                for (const entries of arraySuffixes) {
                    const paths = entries[1];
                    const suffix = appliedOrUnapplied(entries[2][0], entries[2][1] || "doesn't distinguish", 'suffix');
                    const { slice1: stem, slice2: usedSuffix } = helperFunctions.standard.sliceKeywordNegative(word, suffix.length);

                    if (DICTIONARY.ALL_WORDS.MAP[stem] && suffix === usedSuffix) {
                        for (const path of paths) {
                            console.log('path |', path);
                            const result = {
                                path: {
                                    person: path[0],
                                    number: path[1],
                                    gender: path[2],
                                },
                                stem: stem,
                                suffix: suffix,
                                affixState: 'suffix',
                                wordclass: 'v',
                                short_path: helperFunctions.formatting.shorten_path('v', { number: path[1], person: path[0], gender: path[2] })
                            }
                            tempArray[stem] ? null : tempArray[stem] = [];
                            tempArray[stem].push(result);
                            tempArray.length++;
                        }
                    }
                }
            }
            break;
        case 'n':
            for (const entries of arraySuffixes) {
                const paths = entries[1];
                const suffix = appliedOrUnapplied(entries[2][0], entries[2][1] || "doesn't distinguish", 'suffix');
                const { slice1: stem, slice2: usedSuffix } = helperFunctions.standard.sliceKeywordNegative(word, suffix.length);

                if (DICTIONARY.ALL_WORDS.MAP[stem] && suffix === usedSuffix) {
                    for (const path of paths) {
                        if (DICTIONARY.ALL_WORDS.MAP[stem].declension === path[3]) {//only push if declension is correct. each noun only has 1 declension.
                            console.log('path |', path);
                            const result = {
                                stem: stem,
                                path: {
                                    case: path[0],
                                    gender: path[1],
                                    number: path[2],
                                    declension: path[3],
                                },
                                suffix: suffix,
                                affixState: 'suffix',
                                wordclass: 'n',
                                short_path: helperFunctions.formatting.shorten_path('n', { declension: path[3], number: path[2], gender: path[1], Case: path[0] })
                            }
                            tempArray[stem] ? null : tempArray[stem] = [];
                            tempArray[stem].push(result);
                        }
                    }
                }
            }
            break;
        case 'adj':
            for (const entries of arraySuffixes) {
                const paths = entries[1];
                const suffix = appliedOrUnapplied(entries[2][0], entries[2][1] || "doesn't distinguish", 'suffix');
                const { slice1: stem, slice2: usedSuffix } = helperFunctions.standard.sliceKeywordNegative(word, suffix.length);

                if (DICTIONARY.ALL_WORDS.MAP[stem] && suffix === usedSuffix) {
                    for (const path of paths) {
                        if (DICTIONARY.ALL_WORDS.MAP[stem].declension === path[3]) {//only push if declension is correct. each noun only has 1 declension.
                            console.log('path |', path);
                            const result = {
                                stem: stem,
                                path: {
                                    case: path[0],
                                    gender: path[1],
                                    number: path[2],
                                    declension: path[3],
                                },
                                suffix: suffix,
                                affixState: 'suffix',
                                wordclass: 'adj',
                                short_path: helperFunctions.formatting.shorten_path('adj', { declension: path[3], number: path[2], gender: path[1], Case: path[0] })
                            }
                            tempArray[stem] ? null : tempArray[stem] = [];
                            tempArray[stem].push(result);
                        }
                    }
                }
            }
            break;
        case 'pp':
            const prefix = arrayPrefixes.word;
            const { slice1: usedPrefix, slice2: stem } = helperFunctions.standard.sliceKeywordPositive(word, prefix.length);

            if (DICTIONARY.ALL_WORDS.MAP[stem] && prefix === usedPrefix) {
                const result = {
                    stem: stem,
                    prefix: prefix,
                    affixState: 'prefix',
                    wordclass: 'pp',
                    short_path: ''//no path for pps
                }
                tempArray[stem] ? null : tempArray[stem] = [];
                tempArray[stem].push(result);
            }
            break;
        case 'part':
            console.log('is part');
            break;
        default: console.warn(`${wordclass} is not a valid wordclass`);
    }
    console.log(tempArray.length, tempArray);
    if (tempArray.length > 0) {
        return tempArray;
    } else {
        return false;
    }
}

const affixChecker = function affixChecker(word, map, isPrefix, returnAll) {

    //console.log(WORD_UTILS.matchAffix(word, map, isPrefix, returnAll));

    let array = [];
    const match = AFFIXES.match(word, map, isPrefix, returnAll);
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
            if (isPrefix) {
                const verbPrefResult = [];
                match.forEach(arr => {

                    const affixApplied = arr[1][0] || '';
                    const affixUnapplied = arr[1][1] || '';

                    affixPerson = arr[2][0];
                    affixGender = arr[2][2];
                    affixNumber = arr[2][1][0];

                    appliedOrUnapplied(affixApplied, affixUnapplied, 'prefix');

                    const { slice1: V1, slice2: V2 } = helperFunctions.standard.sliceKeywordPositive(word, affix.length);

                    let matchResult = {
                        affixType,
                        affixPerson,
                        affixGender,
                        affixNumber,
                        affixStem: V2,
                        affix,
                    }
                    verbPrefResult.push(matchResult);
                });
                return verbPrefResult;
            } else if (isPrefix === false) {
                const verbSuffResult = [];
                match.forEach(arr => {

                    const affixApplied = arr[1][0] || '';
                    const affixUnapplied = arr[1][1] || '';

                    affixPerson = arr[2][0];
                    affixGender = arr[2][2];
                    affixNumber = arr[2][1][0];

                    appliedOrUnapplied(affixApplied, affixUnapplied, 'suffix');

                    const { slice1: V1, slice2: V2 } = helperFunctions.standard.sliceKeywordNegative(word, affix.length);

                    let matchResult = {
                        affixType,
                        affixPerson,
                        affixGender,
                        affixNumber,
                        affixStem: V1,
                        affix,
                    }

                    verbSuffResult.push(matchResult);
                });
                return verbSuffResult;
            }

            //console.log(affix, affixStem);
            break;
        case 'n':
            if (isPrefix === false) {
                const nounSuffResult = [];
                match.forEach(arr => {

                    const affixApplied = arr[1][0] || '';
                    const affixUnapplied = arr[1][1] || '';

                    appliedOrUnapplied(affixApplied, affixUnapplied, 'suffix');

                    affixDeclension = arr[2][3][0];
                    affixCase = arr[2][0];
                    affixGender = arr[2][1];
                    affixNumber = arr[2][2][0];

                    const { slice1: N1, slice2: N2 } = helperFunctions.standard.sliceKeywordNegative(word, affix.length);
                    const MAP = DICTIONARY.ALL_WORDS.MAP[affixStem];

                    if (MAP && MAP.type === 'adj') { affixType = 'adj' }//check if adj
                    const matchResult = {
                        affixType,
                        affixGender,
                        affixNumber,
                        affixDeclension,
                        affixStem: N1,
                        affixCase,
                        affix,
                    }
                    nounSuffResult.push(matchResult);
                });
                return nounSuffResult;
            }
            break;
        case 'pp':
            if (isPrefix) {
                const ppResult = [];
                match.forEach(arr => {

                    const { slice1: PP1, slice2: PP2 } = helperFunctions.standard.sliceKeywordPositive(word, arr.word.length);
                    const matchResult = {
                        affix: arr.word || '',
                        affixStem: PP2,
                        affixType: match.type
                    }
                    ppResult.push(matchResult);
                });
                return ppResult;
            }
            break;
        case 'part':
            if (isPrefix) {
                const pResult = [];
                match.forEach(arr => {
                    //console.log(arr);
                    //console.log(arr.word, arr.type, arr.word.length);
                    const { slice1: P1, slice2: P2 } = helperFunctions.standard.sliceKeywordPositive(word, arr.word.length);
                    const matchResult = {
                        affix: arr.word,
                        affixStem: P2,
                        affixType: arr.type,
                    }
                    pResult.push(matchResult);
                });
                return pResult;
            } else if (isPrefix === false) {
                const pResult = [];
                match.forEach(arr => {
                    //console.log(arr);
                    //console.log(arr.word, arr.type, arr.word.length);
                    const { slice1: P1, slice2: P2 } = helperFunctions.standard.sliceKeywordNegative(word, arr.word.length);
                    const matchResult = {
                        affix: arr.word,
                        affixStem: P1,
                        affixType: arr.type,
                    }
                    pResult.push(matchResult);
                });
                return pResult;
            }
            break;
        case 'adj':
            if (isPrefix === false) {
                const adjSuffResult = [];
                match.forEach(arr => {

                    const affixApplied = arr[1][0] || '';
                    const affixUnapplied = arr[1][1] || '';

                    appliedOrUnapplied(affixApplied, affixUnapplied, 'suffix');

                    affixDeclension = arr[2][3][0];
                    affixCase = arr[2][0];
                    affixGender = arr[2][1];
                    affixNumber = arr[2][2][0];

                    const { slice1: N1, slice2: N2 } = helperFunctions.standard.sliceKeywordNegative(word, affix.length);
                    const MAP = DICTIONARY.ALL_WORDS.MAP[affixStem];

                    const matchResult = {
                        affixType,
                        affixGender,
                        affixNumber,
                        affixDeclension,
                        affixStem: N1,
                        affixCase,
                        affix,
                    }
                    adjSuffResult.push(matchResult);
                });
                return adjSuffResult;
            }
            break;
        default:
            console.warn(`${affixType} is not a valid affix type`);
    }
}

const matchtype2 = {
    affixChecker,
    neoAffixChecker
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
const neoVerbTables = function neoVerbTables(isPrefix, word, wrapper) {

    const affixStateMap = {
        true: ['Prefix',],// ⟅(^‿^)⟆ - Shelf the elf
        false: ['Suffix', DICTIONARY.VERBS.SUFFIXES.MAP]
    } // ⟅(^‿^)⟆ - Shelf the elf


    function affixHandlerGenders(isPrefix, word, person, number, hasBorder = false) {
        let string = "";

        for (const gender of GENDERS.FLAT.NAME) {
            string += `<td${hasBorder ? " style = 'border-bottom: 1px solid var(--border)' " : ''}>${affixHandler(isPrefix, word, person, number, gender)}</td>\n`;
        }

        return string;
    } // show me


    function affixHandler(isPrefix, word, person, number, gender) {// ⟅(^‿^)⟆ - Shelf the elf
        return isPrefix
            ? CHARACTERS.entriesToText(AFFIXES.connectSplit(DICTIONARY.VERBS.PREFIXES.MAP[person][number][gender], word, '')[0])
            : DICTIONARY.VERBS.SUFFIXES.MAP[person][number][gender];
    }

    const html = `
        <table id="Verb-Table-${isPrefix ? 'Prefix' : 'Suffix'}" style="margin-bottom: 10px;">
            <thead>
                <tr>
                    <th colSpan = 2>${affixStateMap[isPrefix][0]}</th>
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
                    <th style = "width:86px" rowSpan = 3>Singular</th>
                    <th style = "width:14px">1.</th>
                    ${affixHandlerGenders(isPrefix, word, 1, IDS.NUMBERS.S)}
                </tr>
                <tr>
                    <th>2.</th>
                    ${affixHandlerGenders(isPrefix, word, 2, IDS.NUMBERS.S)} 
                </tr>
                <tr>
                    <th>3.</th>
                    ${affixHandlerGenders(isPrefix, word, 3, IDS.NUMBERS.S, true)} 
                </tr>
                <tr>
                    <th rowSpan = 3>Dual</th>
                    <th>1.</th>
                    ${affixHandlerGenders(isPrefix, word, 1, IDS.NUMBERS.D)}
                </tr>
                <tr>
                    <th>2.</th>
                    ${affixHandlerGenders(isPrefix, word, 2, IDS.NUMBERS.D)} 
                </tr>
                <tr>
                    <th>3.</th>
                    ${affixHandlerGenders(isPrefix, word, 3, IDS.NUMBERS.D, true)} 
                </tr>
                <tr>
                    <th rowSpan = 3>Plural</th>
                    <th>1.</th>
                    ${affixHandlerGenders(isPrefix, word, 1, IDS.NUMBERS.P)}
                </tr>
                <tr>
                    <th>2.</th>
                    ${affixHandlerGenders(isPrefix, word, 2, IDS.NUMBERS.P)} 
                </tr>
                <tr>
                    <th>3.</th>
                    ${affixHandlerGenders(isPrefix, word, 3, IDS.NUMBERS.P, true)} 
                </tr>
            </tbody>
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
            const entry = Object.entries(DICTIONARY.NOUNS.SUFFIXES.MAP[mooooood]);
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
            const entry = Object.entries(DICTIONARY.NOUNS.SUFFIXES.MAP[mooooood]);
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
            if (tables[tableId]) entries = AFFIXES.connectSplit(textInCell, keyword, "");
            else entries = AFFIXES.connectSplit("", keyword, textInCell);
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
    removeParensSpacesAndDigits,
    shorten_path
}


const displayForms = function displayForms(allMatchesArray) {
    if (!allMatchesArray) return;

    const div = document.getElementById('listDiv');
    if (!div) return;

    const tempArray = {
        type1: [],
        type2: []
    };
    for (const [key, map] of Object.entries(allMatchesArray.type1)) {
        //console.log(key, map);
        if (key === 'v') {
            if (map.lur.length > 0) {
                //console.log(map.lur, map.regular);
                map.lur.forEach(el => {
                    el['wordclass'] = 'v';
                    el['verbType'] = 'lur';
                    tempArray.type1.push(el);
                });
            }
            if (map.regular.length > 0) {
                map.regular.forEach(el => {
                    el['wordclass'] = 'v';
                    el['verbType'] = 'regular';
                    tempArray.type1.push(el);
                });
            }
        } else {
            if (map.length > 0) {
                map.forEach(el => {
                    el['wordclass'] = key;
                    tempArray.type1.push(el);
                });
            }
        }
    }
    for (const [key, map] of Object.entries(allMatchesArray.type2)) {
        if (map.state) {
            for (el of map.resultMap) {
                el['key'] = key;
                tempArray.type2.push(el);
            }
        }
    }
    console.log(tempArray);

    const html = `
        <table>
            <thead>
                <tr>
                    <th style="cursor:pointer"; id="shortPathGuide">Maybe you were looking for:</th>
                </tr>
            </thead>
            <tbody id="listTbody"></tbody>
        </table>
    `;
    helperFunctions.standard.createDivById('', div, html);

    let tableTextState = 0;
    function fixTable() {
        tableTextState = 1;

        tempArray.type1.forEach(el => {
            const htmlEach = `
                <td 
                    style="cursor:pointer"; 
                    data-verbType="${el.verbType || ''}"; 
                    data-wordclass="${el.wordclass}"; 
                    data-path="${el.path_short || '...'}"; 
                    data-pausestate="false";
                >${el.wordclass}.${el.path_short || '..'}</td>
            `;
            helperFunctions.standard.betterTrInsert("listTbody", htmlEach);

            const td = document.querySelector('#listTbody tr:last-child td:last-child');
            // ⟅(^‿^)⟆ - Shelf the elf

            function search() {
                let pageHtml = '';
                // ⟅(^‿^)⟆ - Shelf the elf

                switch (td.dataset.wordclass) {
                    case 'v':
                        if (el.verbType === 'lur') {
                            console.log('is lur type');
                            pageHtml = `
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Word</th>
                                            <th>Aspect</th>
                                            <th>Gender</th>
                                            <th>Number</th>
                                            <th>Person</th>
                                            <th>Tense</th>
                                            <th>Wordclass</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>${el.word}</td>
                                            <td>${el.path.aspect}</td>
                                            <td>${el.path.gender}</td>
                                            <td>${el.path.number}</td>
                                            <td>${el.path.person}</td>
                                            <td>${el.path.tense}</td>
                                            <td>${el.wordclass /* need to get the whole word. */}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            `;
                        } else if (el.verbType === 'regular') {
                            console.log('is regular type');
                            pageHtml = `
                                <table style="margin-bottom:10px;">
                                    <thead>
                                        <tr>
                                            <th>Word</th>
                                            <th>Definition</th>
                                            <th>Forms</th>
                                            <th>Usage Notes</th>
                                            <th>Wordclass</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>${el.word}</td>
                                            <td>${el.definition}</td>
                                            <td>${el.forms}</td>
                                            <td>${el.usage_notes || '...'}</td>
                                            <td>${el.wordclass}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div id="tableDiv"></div>
                            `;
                            helperFunctions.tablegen.waitForElement(`.page #tableDiv`).then(tableWrapper => {
                                //console.log(tableWrapper);
                                helperFunctions.matchtype1.neoVerbTables(1, el.word, tableWrapper);
                                helperFunctions.matchtype1.neoVerbTables(2, el.word, tableWrapper);

                                helperFunctions.tablegen.populateSummaryTables(el.word, { 'Verb-Table-Prefix': true, 'Verb-Table-Suffix': false });
                            });
                        }
                        break;
                    case 'pn':
                        pageHtml = `
                            <table>
                                <thead>
                                    <tr>
                                        <th>Word</th>
                                        <th>Case</th>
                                        <th>Gender</th>
                                        <th>Number</th>
                                        <th>Person</th>
                                        <th>Wordclass</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>${el.word}</td>
                                        <td>${el.path.case}</td>
                                        <td>${el.path.gender}</td>
                                        <td>${el.path.number}</td>
                                        <td>${el.path.person}</td>
                                        <td>${el.wordclass}</td>
                                    </tr>
                                </tbody>
                            </table>
                        `;
                        break;
                    case 'cor':
                        pageHtml = `
                            <table>
                                <thead>
                                    <tr>
                                        <th>Word</th>
                                        <th>Case</th>
                                        <th>Gender</th>
                                        <th>Wordclass</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>${el.word}</td>
                                        <td>${el.path.case}</td>
                                        <td>${el.path.gender}</td>
                                        <td>${el.wordclass}</td>
                                    </tr>
                                </tbody>
                            </table>
                        `;
                        break;
                    case 'det':
                        pageHtml = `
                            <table>
                                <thead>
                                    <tr>
                                        <th>Word</th>
                                        <th>Gender</th>
                                        <th>Number</th>
                                        <th>Wordclass</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>${el.word}</td>
                                        <td>${el.path.gender}</td>
                                        <td>${el.path.number}</td>
                                        <td>${el.wordclass}</td>
                                    </tr>
                                </tbody>
                            </table>
                        `;
                        break;

                    default: console.warn(`${td.dataset.wordclass} is an invalid wordclass`);
                        break;
                }

                helperFunctions.standard.createPageById('page94', pageHtml);
                openPageOld('page94');
                // ⟅(^‿^)⟆ - Shelf the elf
            }
            td.addEventListener('click', () => {
                if (td.dataset.pausestate === "false") {
                    helperFunctions.standard.clearPageById('page97'); //type 1
                    helperFunctions.standard.clearPageById('page95'); //type 1.1
                    helperFunctions.standard.clearPageById('page96'); //type 2
                    helperFunctions.standard.clearPageById('page94'); //type 
                    search();

                    //moves the 'were you lf' table to result page.vv
                    let newDiv = document.getElementById('listDiv');
                    //console.log(div, newDiv);
                    newDiv.appendChild(div);
                } else return;
            });
        });
    }
    fixTable();

    const tbody = document.getElementById('listTbody');
    function displayGuide() {
        tableTextState = 2;

        tbody.querySelectorAll('td').forEach(td => {
            if (td.dataset.pausestate === "false") {
                td.dataset.pausestate = "true";
                td.style.cursor = 'text';
            } else if (td.dataset.pausestate === "true") {
                td.dataset.pausestate = "false";
                td.style.cursor = 'pointer';
            }
            // ⟅(^‿^)⟆ - Shelf the elf
            switch (td.dataset.wordclass) {
                case 'v':
                    if (td.dataset.verbtype === "lur") {
                        td.textContent = "Verb.Aspect.Gender.Number.Person.Tense";
                    } else if (td.dataset.verbtype === "regular") {
                        td.textContent = "Verb.Stem";
                    }
                    break;
                case 'pn':
                    td.textContent = "Pronoun.Case.Gender.Number.Person";
                    break;
                case 'cor':
                    td.textContent = "Correlative.Type.Case.Gender";
                    break;
                case 'det':
                    td.textContent = "Determiner.Type.Number.Gender";
                    break;
                case 'adj':
                    td.textContent = "Adjective.Stem";
                    break;
                case 'adv':
                    td.textContent = "Adverb.Stem";
                    break;
                case 'aux':
                    td.textContent = "Auxilary.Stem";
                    break;
                case 'con':
                    td.textContent = "Conjunction.Stem";
                    break;
                case 'n':
                    td.textContent = "Noun.Stem";
                    break;
                case 'part':
                    td.textContent = "Particle.Stem";
                    break;
                case 'pp':
                    td.textContent = "Preposition.Stem";
                    break;
                default:
                    td.textContent = td.dataset.wordclass;
                    break;
            }
        });
    }

    const guideTh = document.getElementById('shortPathGuide');
    guideTh.addEventListener('click', () => {
        if (tableTextState === 1) {
            displayGuide()
        } else if (tableTextState === 2) {
            tbody.innerHTML = ``;
            fixTable();
        }
    });
}

const final = {
    displayForms
}



const helperFunctions =
{
    standard,
    matchtype3,
    matchtype2,
    matchtype1,
    tablegen,
    formatting,
    final
}

function testingAffixChecker(input, map, isPrefix = true, returnAll = false) {
    if (!input || typeof input !== "string") return null;

    const matches = [];
    let best = null;
    let bestLen = 0;

    for (const [key, val] of Object.entries(map)) {
        const variants = Array.isArray(val[1]) ? val[1] : [key];
        console.log(val);
        for (const v of variants) {
            if (typeof v !== "string") continue;
            const match = isPrefix ? input.startsWith(v) : input.endsWith(v);
            if (!match) continue;

            if (returnAll) matches.push(val);
            else if (v.length > bestLen) {
                best = val;
                bestLen = v.length;
            }
        }
    }

    if (returnAll) return matches.length ? matches : null;
    return best;
};

/*
    let entries = WORD_UTILS.connectSplit("", 'la', '(u)n');
    CHARACTERS.entriesToText(entries[2]); //'n'

    let entries = WORD_UTILS.connectSplit("", 'lal', '(u)n');
    CHARACTERS.entriesToText(entries[2]); //'un'
*/

//vv experimental. the one i sent to you on discord earlier.//////////////////////////////
function testingChecker(keyword, map, isPrefix = true) {
    const tempArray = [];
    for (const [personKey, personMap] of Object.entries(map)) {
        for (const [numberKey, numberMap] of Object.entries(personMap)) {
            for (const [genderKey, affix] of Object.entries(numberMap)) {
                if (DICTIONARY.VERBS.SUFFIXES.MAP === map || DICTIONARY.VERBS.PREFIXES.MAP === map) {
                    const result = {
                        variants: [],
                        person: personKey,
                        number: numberKey,
                        gender: genderKey,
                        affixType: isPrefix ? 'Prefix' : 'Suffix',
                        affix: affix, //temp. overwritten later down.
                    };
                    const optionalOnEntry = AFFIXES.connectSplit("", 'x', affix);
                    const optionalOnText = CHARACTERS.entriesToText(optionalOnEntry[2]);
                    result.variants[0] = optionalOnText;
                    if (optionalOnEntry[2][0].prop[1] === 6) {
                        const optionalOffEntry = AFFIXES.connectSplit("", 'a', affix);
                        const optionalOffText = CHARACTERS.entriesToText(optionalOffEntry[2]);
                        result.variants[1] = optionalOffText;
                    }
                    for (const el of result.variants) {
                        if (isPrefix === false) {
                            if (keyword.endsWith(el)) {
                                result.affix = el;
                                tempArray.push(result);
                                //break; // stop further matches
                            }
                        } else if (isPrefix) {
                            if (keyword.startsWith(el)) {
                                result.affix = el;
                                tempArray.push(result);
                                //break; // stop further matches
                            }
                        }
                    }
                }
                /*
                    else if (DICTIONARY.NOUNS.SUFFIXES.MAP === map) {
                        for (const [nounKey, nounAffix] of Object.entries(affix)) {
                            const result = {
                                variants: [],
                                case: personKey,
                                gender: numberKey,
                                number: nounKey,
                                declension: genderKey,
                                affixType: isPrefix ? 'Prefix' : 'Suffix',
                                affix: nounAffix, //temp. overwritten later down.
                            };
                            const optionalOnEntry = AFFIXES.connectSplit("", 'x', affix);
                            const optionalOnText = CHARACTERS.entriesToText(optionalOnEntry[2]);
                            result.variants[0] = optionalOnText;
                            if (optionalOnEntry[2][0].prop[1] === 6) {
                                const optionalOffEntry = AFFIXES.connectSplit("", 'a', affix);
                                const optionalOffText = CHARACTERS.entriesToText(optionalOffEntry[2]);
                                result.variants[1] = optionalOffText;
                            }
                            for (const el of result.variants) {
                                if (keyword.endsWith(el)) {
                                    result.affix = el;
                                    console.log(result);
                                    break; // stop further matches
                                }
                            }
                        }
                    }
                */
            }
        }
    }
    console.log(tempArray);
}