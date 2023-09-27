import * as member from "./js-member.js";
import * as result from "./js-result.js";

main();

async function main() {
  await buildMembersList();
  displayMembers(members);
  await pushResultsToList();
  showResults(results);
}

const members = [];

async function fetchMembers() {
  const resp = await fetch("members.json");
  const data = await resp.json();
  return data;
}

async function buildMembersList() {
  const originalObjects = await fetchMembers();

  for (const orgobj of originalObjects) {
    const memberObj = member.construct(orgobj);
    members.push(memberObj);
  }
}

function displayMembers(members) {
  const table = document.querySelector("table#members tbody");
  table.innerHTML = "";
  for (const member of members) {
    const name = member.firstName + " " + member.lastName;

    const html = /*html*/ `
    <tr>
      <td>${name}</td>
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
    const resultObj = result.construct(oldResultObj);
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
}
