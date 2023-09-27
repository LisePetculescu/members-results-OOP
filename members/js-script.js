import * as member from "./js-member.js";
import * as result from "./js-result.js";

main();

async function main() {
  await buildMembersList();
  displayMembers(members);
  await pushResultsToList();
  showResults(results);
  console.log("test");
}

const members = [];

async function fetchMembers() {
  const resp = await fetch("members.json");
  const data = await resp.json();
  console.log("another test");
  return data;
}

async function buildMembersList() {
  const originalObjects = await fetchMembers();

  for (const orgobj of originalObjects) {
    const memberObj = member.constructMember(orgobj);
    members.push(memberObj);
  }
}

function displayMembers(members) {
  const table = document.querySelector("table#members tbody");
  table.innerHTML = "";
  for (const member of members) {
    const html = /*html*/ `
    <tr>
      <td>${member.name}</td>
      <td>${member.active}</td>
      <td>${member.birthday.toLocaleString("da", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })}</td>
      <td>${member.age}</td>
      <td>${member.ageGroup}</td>
      <td>${member.email}</td>
    </tr>`;

    table.insertAdjacentHTML("beforeend", html);
  }
}

// --------------------------------
// ------------Results-------------
// --------------------------------

const results = [];

async function fetchResults() {
  const resp = await fetch("results.json");
  const data = await resp.json();
  return data;
}

async function pushResultsToList() {
  const resultsObjects = await fetchResults();

  for (const oldResultObj of resultsObjects) {
    const resultObj = result.constructResult(oldResultObj);
    results.push(resultObj);
  }
}

function showResults(results) {
  results.sort((a, b) => a.time - b.time);
  // results.sort((a, b) => a.date - b.date);

  const table = document.querySelector("table#results tbody");
  table.innerHTML = "";
  for (const result of results) {
    const html = /*html*/ `
    <tr>
      <td>${result.date.toLocaleString("da", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })}</td>
      <td>${result.memberId}</td>
      <td>${result.discipline}</td>
      <td>${result.type}</td>
      <td>${result._time}</td>
    </tr>`;

    table.insertAdjacentHTML("beforeend", html);
  }

  // dato – for eksempel “mandag 18. september 2023” eller “18. sep 2023” eller “man 18. sep 2023”
  // medlems id – fx -NVsgwYlb7PHXcVblSfA eller -KMN3xh-tz_7u3EgsjG1
  // disciplin: ryg, bryst, crawl, butterfly eller freestyle
  // type: træning eller stævne
  // tid: i et format som fx 00:23.56 altså minutter:sekunder.hundrededele
}
