import React, { useState, useEffect } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import PageWrapper from '../../shared/components/PageWrapper';
import kindergartenService from '../api/kindergartenService';

const ALLERGY_TYPE_LABELS = {
  FOOD: 'Hrana',
  MEDICATION: 'Lekovi',
  ENVIRONMENTAL: 'Okruženje',
  INSECT: 'Insekti',
  OTHER: 'Ostalo'
};

const PIE_COLORS = ['#8b5cf6', '#06b6d4', '#f59e0b', '#10b981', '#f43f5e'];

const MONTH_LABELS = {
  '1': 'Jan', '2': 'Feb', '3': 'Mar', '4': 'Apr',
  '5': 'Maj', '6': 'Jun', '7': 'Jul', '8': 'Avg',
  '9': 'Sep', '10': 'Okt', '11': 'Nov', '12': 'Dec'
};

const cardStyle = {
  backgroundColor: 'white',
  borderRadius: '12px',
  padding: '24px',
  boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1)',
  border: '1px solid #e5e7eb'
};

const titleStyle = {
  fontSize: '16px',
  fontWeight: 700,
  color: '#1f2937',
  marginBottom: '20px'
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        backgroundColor: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        padding: '10px 14px',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
        fontSize: '13px'
      }}>
        {label && <p style={{ fontWeight: 600, color: '#374151', marginBottom: 4 }}>{label}</p>}
        {payload.map((entry, i) => (
          <p key={i} style={{ color: entry.color || '#6b7280', margin: 0 }}>
            {entry.name}: <strong>{entry.value}</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const KindergartenStatisticsDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await kindergartenService.getStatistics();
        setStats(data);
      } catch (err) {
        setError('Greška pri učitavanju statistike');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <PageWrapper title="Statistika">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '256px' }}>
          <div style={{ color: '#6b7280' }}>Učitavanje...</div>
        </div>
      </PageWrapper>
    );
  }

  if (error) {
    return (
      <PageWrapper title="Statistika">
        <div style={{
          padding: '16px',
          backgroundColor: '#fee2e2',
          border: '1px solid #fca5a5',
          borderRadius: '8px',
          color: '#991b1b'
        }}>
          {error}
        </div>
      </PageWrapper>
    );
  }

  const allergyPieData = stats?.allergiesByType
    ? Object.entries(stats.allergiesByType).map(([type, count]) => ({
        name: ALLERGY_TYPE_LABELS[type] || type,
        value: count
      }))
    : [];

  const illnessBarData = stats?.urgentIllnessByMonth
    ? Object.entries(stats.urgentIllnessByMonth)
        .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
        .map(([month, count]) => ({ month: MONTH_LABELS[month] || month, Broj: count }))
    : [];

  const vaccineBarData = stats?.vaccinesByMonth
    ? Object.entries(stats.vaccinesByMonth)
        .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
        .map(([month, count]) => ({ month: MONTH_LABELS[month] || month, Broj: count }))
    : [];

  const percentage = stats?.percentageOfChildrenWithAllergy?.toFixed(1) ?? '—';
  const conicDeg = parseFloat(percentage) * 3.6;

  return (
    <PageWrapper title="Statistika">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

        {/* Red 1: Pie grafik + Procenat kartica */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

          <div style={cardStyle}>
            <p style={titleStyle}>Alergije po tipu</p>
            {allergyPieData.length === 0 ? (
              <div style={{ color: '#9ca3af', textAlign: 'center', paddingTop: 40 }}>Nema podataka</div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={allergyPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={110}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {allergyPieData.map((entry, index) => (
                      <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    iconType="circle"
                    iconSize={10}
                    formatter={(value) => (
                      <span style={{ fontSize: '13px', color: '#374151' }}>{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>

          <div style={{
            ...cardStyle,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px'
          }}>
            <p style={{ ...titleStyle, marginBottom: 0, textAlign: 'center' }}>
              Deca sa alergijom
            </p>
            <div style={{
              width: '160px',
              height: '160px',
              borderRadius: '50%',
              background: `conic-gradient(#8b5cf6 ${conicDeg}deg, #ede9fe ${conicDeg}deg)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 0 12px #f5f3ff'
            }}>
              <div style={{
                width: '110px',
                height: '110px',
                borderRadius: '50%',
                backgroundColor: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ fontSize: '32px', fontWeight: 800, color: '#7c3aed' }}>
                  {percentage}%
                </span>
              </div>
            </div>
            <p style={{ fontSize: '14px', color: '#6b7280', textAlign: 'center', margin: 0 }}>
              od ukupnog broja dece ima<br />registrovanu alergiju
            </p>
          </div>
        </div>

        {/* Red 2: Hitne bolesti po mesecima */}
        <div style={cardStyle}>
          <p style={titleStyle}>Hitne bolesti po mesecima</p>
          {illnessBarData.length === 0 ? (
            <div style={{ color: '#9ca3af', textAlign: 'center', paddingTop: 40 }}>Nema podataka</div>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={illnessBarData} margin={{ top: 4, right: 16, left: 0, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="month" tick={{ fontSize: 13, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                <YAxis allowDecimals={false} tick={{ fontSize: 13, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f3f4f6' }} />
                <Bar dataKey="Broj" fill="#f43f5e" radius={[6, 6, 0, 0]} maxBarSize={48} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Red 3: Vakcinacije po mesecima */}
        <div style={cardStyle}>
          <p style={titleStyle}>Vakcinacije po mesecima</p>
          {vaccineBarData.length === 0 ? (
            <div style={{ color: '#9ca3af', textAlign: 'center', paddingTop: 40 }}>Nema podataka</div>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={vaccineBarData} margin={{ top: 4, right: 16, left: 0, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="month" tick={{ fontSize: 13, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                <YAxis allowDecimals={false} tick={{ fontSize: 13, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f3f4f6' }} />
                <Bar dataKey="Broj" fill="#8b5cf6" radius={[6, 6, 0, 0]} maxBarSize={48} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

      </div>
    </PageWrapper>
  );
};

export default KindergartenStatisticsDashboard;