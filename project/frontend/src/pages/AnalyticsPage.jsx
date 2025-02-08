import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import useLocalStorage from '../hooks/useLocalStorage';

function AnalyticsPage() {
  const [products] = useLocalStorage('stock', []);
  const trendsChartRef = useRef(null);
  const categoryChartRef = useRef(null);
  const [trendsChart, setTrendsChart] = useState(null);
  const [categoryChart, setCategoryChart] = useState(null);

  const calculateTotalValue = () =>
    products.reduce((sum, p) => sum + p.price * p.quantity, 0);

  const processChartData = () => {
    const categories = [...new Set(products.map(p => p.category))];
    const categoryData = categories.map(cat => ({
      category: cat,
      value: products
        .filter(p => p.category === cat)
        .reduce((sum, p) => sum + p.price * p.quantity, 0)
    }));
    return { categories, categoryData };
  };

  useEffect(() => {
    const { categories, categoryData } = processChartData();
    
    if (trendsChartRef.current) {
      if (trendsChart) trendsChart.destroy();
      const totalValue = calculateTotalValue();
      const newTrendsChart = new Chart(trendsChartRef.current, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'Valeur du Stock',
            data: [
              totalValue * 0.8,
              totalValue * 0.85,
              totalValue * 0.9,
              totalValue * 0.95,
              totalValue * 0.97,
              totalValue
            ],
            borderColor: '#4e73df',
            tension: 0.1
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { position: 'top' } }
        }
      });
      setTrendsChart(newTrendsChart);
    }

    if (categoryChartRef.current) {
      if (categoryChart) categoryChart.destroy();
      const newCategoryChart = new Chart(categoryChartRef.current, {
        type: 'pie',
        data: {
          labels: categories,
          datasets: [{
            data: categoryData.map(d => d.value),
            backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e']
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { position: 'top' } }
        }
      });
      setCategoryChart(newCategoryChart);
    }
  }, [products]);

  return (
    <div id="analytics-page" >
      <h1 className="mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="40" fill="currentColor" class="bi bi-graph-up" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M0 0h1v15h15v1H0zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07"/>
</svg> Analytiques
      </h1>
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card" style={{ height: '300px' }}>
            <div className="card-bodyss">
              <h5 className="card-title">Tendances des Stocks</h5>
              <canvas id="trendsChart" ref={trendsChartRef}></canvas>
            </div>
          </div>
        </div>
        <div id='ss' className="col-md-6 ">
          <div className="cardq">
            <div className="card-bodys">
              <h5 className="card-title">Répartition des Catégories</h5>
              <canvas  id="categoryChart"  ref={categoryChartRef}></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;
