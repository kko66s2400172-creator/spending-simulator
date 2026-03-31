// 공통 함수: 값 가져오기
function getValue(id) {
  return Number(document.getElementById(id)?.value || localStorage.getItem(id)) * 10000;
}

// 공통 함수: 상태 판단
function getStatus(rate) {
  if (rate < 20) {
    return {
      text: "위험",
      feedback: "지출이 많습니다. 줄이는 것이 필요합니다.",
      color: "red"
    };
  } else if (rate < 40) {
    return {
      text: "보통",
      feedback: "조금 더 저축하면 더 안정적입니다.",
      color: "orange"
    };
  } else {
    return {
      text: "안정",
      feedback: "매우 좋은 소비 습관입니다.",
      color: "green"
    };
  }
}

// 공통 함수: 결과 계산
function calculateData(income, expense) {
  const saving = income - expense;
  const rate = (saving / income) * 100;

  return {
    year1: saving * 12,
    year3: saving * 12 * 3,
    year5: saving * 12 * 5,
    rate
  };
}

// 입력 → 결과 이동
function goResult() {
  const income = document.getElementById("income").value;
  const expense = document.getElementById("expense").value;

  if (!income || !expense) {
    alert("값을 입력하세요!");
    return;
  }

  localStorage.setItem("income", income);
  localStorage.setItem("expense", expense);

  window.location.href = "result.html";
}

// 결과 페이지 실행
function loadResult() {
  const income = getValue("income");
  const expense = getValue("expense");

  const data = calculateData(income, expense);
  const status = getStatus(data.rate);

  // 출력 함수
  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.innerText = text;
  };

  setText("year1", `1년 후: ${data.year1.toLocaleString()}원`);
  setText("year3", `3년 후: ${data.year3.toLocaleString()}원`);
  setText("year5", `5년 후: ${data.year5.toLocaleString()}원`);

  setText("status", `상태: ${status.text}`);
  setText("feedback", status.feedback);

  const statusEl = document.getElementById("status");
  if (statusEl) statusEl.style.color = status.color;

  // 그래프
  const ctx = document.getElementById("myChart");
  if (ctx) {
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["1년", "3년", "5년"],
        datasets: [{
          label: "자산 증가 (원)",
          data: [data.year1, data.year3, data.year5]
        }]
      }
    });
  }
}

// 뒤로가기
function goBack() {
  window.location.href = "index.html";
}