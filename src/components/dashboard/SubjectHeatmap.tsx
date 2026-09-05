import React, { useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import { SSCTestAttempt, SSCSubjectId } from '../../types';
import { SSC_SUBJECT_ORDER, SSC_SUBJECTS_CONFIG } from '../../data/sscSubjectsData';

interface SubjectHeatmapProps {
  attempts: SSCTestAttempt[];
}

export function SubjectHeatmap({ attempts }: SubjectHeatmapProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Sort attempts chronologically
  const sortedAttempts = useMemo(() => {
    return [...attempts].sort((a, b) => a.timestamp - b.timestamp);
  }, [attempts]);

  useEffect(() => {
    if (!containerRef.current || sortedAttempts.length === 0) return;

    // Clear previous render
    d3.select(containerRef.current).selectAll('*').remove();

    const margin = { top: 30, right: 30, bottom: 50, left: 130 };
    const width = containerRef.current.clientWidth - margin.left - margin.right;
    const height = 350 - margin.top - margin.bottom;

    const svg = d3.select(containerRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Prepare data
    const subjects = SSC_SUBJECT_ORDER;
    const testLabels = sortedAttempts.map((_, i) => `T${i + 1}`);

    const data: Array<{ subject: string; test: string; percentage: number; attemptIndex: number }> = [];
    
    subjects.forEach((subjId) => {
      const config = SSC_SUBJECTS_CONFIG[subjId];
      sortedAttempts.forEach((att, idx) => {
        const bd = att.subjectBreakdown[subjId as SSCSubjectId];
        data.push({
          subject: config.name,
          test: `T${idx + 1}`,
          percentage: bd ? bd.percentage : 0,
          attemptIndex: idx,
        });
      });
    });

    const subjectNames = subjects.map(s => SSC_SUBJECTS_CONFIG[s].name);

    // Build X scales and axis
    const x = d3.scaleBand()
      .range([0, width])
      .domain(testLabels)
      .padding(0.05);
      
    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x).tickSize(0))
      .select('.domain').remove();

    // X Axis Label
    svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('x', width / 2)
      .attr('y', height + margin.bottom - 10)
      .style('font-size', '12px')
      .style('font-weight', 'bold')
      .style('fill', '#64748b')
      .text('Test Attempts (Chronological)');

    // Build Y scales and axis
    const y = d3.scaleBand()
      .range([height, 0])
      .domain(subjectNames)
      .padding(0.05);
      
    svg.append('g')
      .call(d3.axisLeft(y).tickSize(0))
      .select('.domain').remove();

    // Y-axis styles
    svg.selectAll('.tick text')
      .style('font-size', '12px')
      .style('font-weight', '500')
      .style('fill', '#475569');

    // Build color scale
    // 0-35: Red (Weak)
    // 35-60: Yellow (Average)
    // 60-100: Green (Strong)
    const colorScale = d3.scaleSequential()
      .interpolator(d3.interpolateYlGnBu)
      .domain([0, 100]);

    // Custom color scale for distinct bands
    const getColor = (value: number) => {
      if (value < 35) return '#fca5a5'; // red-300
      if (value < 60) return '#fde047'; // yellow-300
      if (value < 80) return '#86efac'; // green-300
      return '#3b82f6'; // blue-500
    };

    // Tooltip
    const tooltip = d3.select(containerRef.current)
      .append('div')
      .style('opacity', 0)
      .attr('class', 'absolute bg-slate-900 text-white text-xs rounded py-1 px-2 pointer-events-none transform -translate-x-1/2 -translate-y-full mt-[-10px] z-50 whitespace-nowrap transition-opacity');

    // Draw squares
    svg.selectAll()
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d) => x(d.test) || 0)
      .attr('y', (d) => y(d.subject) || 0)
      .attr('rx', 4)
      .attr('ry', 4)
      .attr('width', x.bandwidth())
      .attr('height', y.bandwidth())
      .style('fill', (d) => getColor(d.percentage))
      .style('stroke', '#e2e8f0')
      .style('stroke-width', '1px')
      .style('transition', 'all 0.2s')
      .on('mouseover', function(event, d) {
        d3.select(this)
          .style('stroke', '#0f172a')
          .style('stroke-width', '2px');
        
        tooltip
          .html(`<strong>${d.subject}</strong><br/>${d.test}: ${Math.round(d.percentage)}% Mastery`)
          .style('opacity', 1)
          .style('left', (event.pageX) + 'px')
          .style('top', (event.pageY) + 'px');
      })
      .on('mousemove', function(event) {
        tooltip
          .style('left', (event.pageX) + 'px')
          .style('top', (event.pageY - 10) + 'px');
      })
      .on('mouseleave', function() {
        d3.select(this)
          .style('stroke', '#e2e8f0')
          .style('stroke-width', '1px');
        tooltip.style('opacity', 0);
      });

    // Draw value text inside rect if space permits
    svg.selectAll()
      .data(data)
      .enter()
      .append('text')
      .attr('x', (d) => (x(d.test) || 0) + x.bandwidth() / 2)
      .attr('y', (d) => (y(d.subject) || 0) + y.bandwidth() / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'middle')
      .style('fill', (d) => (d.percentage < 60 || d.percentage >= 80 && d.percentage < 100) ? '#1e293b' : '#ffffff') // contrast color
      .style('fill', (d) => {
        if (d.percentage >= 80) return '#ffffff'; // blue-500 is dark enough
        if (d.percentage < 35) return '#991b1b'; // red-800
        if (d.percentage < 60) return '#854d0e'; // yellow-800
        return '#14532d'; // green-900
      })
      .style('font-size', '10px')
      .style('font-weight', 'bold')
      .style('pointer-events', 'none')
      .text((d) => Math.round(d.percentage));

  }, [sortedAttempts]);

  // Legend
  const renderLegend = () => (
    <div className="flex items-center justify-center gap-4 mt-4 text-xs font-medium text-slate-600">
      <div className="flex items-center gap-1.5">
        <div className="w-3 h-3 rounded-sm bg-red-300 border border-slate-200"></div>
        <span>Needs Work (&lt;35%)</span>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="w-3 h-3 rounded-sm bg-yellow-300 border border-slate-200"></div>
        <span>Average (35-59%)</span>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="w-3 h-3 rounded-sm bg-green-300 border border-slate-200"></div>
        <span>Strong (60-79%)</span>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="w-3 h-3 rounded-sm bg-blue-500 border border-slate-200"></div>
        <span>Excellent (80%+)</span>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      {sortedAttempts.length > 0 ? (
        <>
          <div ref={containerRef} className="w-full overflow-hidden relative"></div>
          {renderLegend()}
        </>
      ) : (
        <div className="h-64 flex items-center justify-center bg-slate-50 border border-dashed border-slate-200 rounded-xl text-slate-400 text-sm">
          No test data available for heatmap
        </div>
      )}
    </div>
  );
}
