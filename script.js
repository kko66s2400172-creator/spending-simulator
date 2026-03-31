// 다크모드
function initTheme() {
  const toggle = document.getElementById("themeToggle");
  const saved = localStorage.getItem("theme");

  if (saved === "dark") {
    document.body.classList.add("dark");
    toggle.checked = true;
  }

  toggle.addEventListener("change", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("theme",
      document.body.classList.contains("dark") ? "dark" : "light"
    );
  });
}

// 입력 → 결과
function goResult() {
  let income = Number(document.getElementById("income").value);
  let expense = Number(document.getElementById("expense").value);

  if (!income || income <= 0 || expense < 0) {
    alert("올바른 값을 입력하세요!");
    return;
  }

  localStorage.setItem("income", income);
  localStorage.setItem("expense", expense);

  window.location.href = "result.html";
}

// 결과 계산
function loadResult() {
  initTheme();

  let income = Number(localStorage.getItem("income")) * 10000;
  let expense = Number(localStorage.getItem("expense")) * 10000;

  let saving = income - expense;
  let rate = (saving / income) * 100;

  let year1 = saving * 12;
  let year3 = saving * 12 * 3;
  let year5 = saving * 12 * 5;

  let status = rate < 20 ? "위험" : rate < 40 ? "보통" : "안정";

  let feedback =
    status === "위험" ? "지출이 많습니다." :
    status === "보통" ? "조금 더 저축하세요." :
    "좋은 소비 습관입니다.";

  let diff = year5 - year1;

  document.getElementById("year1").innerText = `1년 후: ${year1.toLocaleString()}원`;
  document.getElementById("year3").innerText = `3년 후: ${year3.toLocaleString()}원`;
  document.getElementById("year5").innerText = `5년 후: ${year5.toLocaleString()}원`;

  document.getElementById("status").innerText = `상태: ${status}`;
  document.getElementById("feedback").innerText =
    `${feedback} (저축률: ${rate.toFixed(1)}%, 5년-1년 차이: ${diff.toLocaleString()}원)`;

  // 그래프
  new Chart(document.getElementById("myChart"), {
    type: "bar",
    data: {
      labels: ["1년", "3년", "5년"],
      datasets: [{
        label: "자산",
        data: [year1, year3, year5]
      }]
    }
  });
}

// 뒤로가기
function goBack() {
  window.location.href = "index.html";
}

// 초기 실행
window.onload = () => {
  if (document.getElementById("themeToggle")) {
    initTheme();
  }
};