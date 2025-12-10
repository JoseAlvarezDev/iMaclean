import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { StorageBreakdown } from '../../store/useStore';
import { formatBytes } from '../../utils/formatters';
import './StorageChart.css';

interface StorageChartProps {
    data: StorageBreakdown;
}

interface TooltipPayload {
    name: string;
    value: number;
    payload: { color: string };
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: TooltipPayload[] }) {
    if (active && payload && payload.length) {
        return (
            <div className="chart-tooltip">
                <p className="chart-tooltip-label">{payload[0].name}</p>
                <p className="chart-tooltip-value">{formatBytes(payload[0].value)}</p>
            </div>
        );
    }
    return null;
}

export function StorageChart({ data }: StorageChartProps) {
    const chartData = useMemo(() => [
        { name: 'Aplicaciones', value: data.apps, color: 'var(--chart-apps)' },
        { name: 'Documentos', value: data.documents, color: 'var(--chart-documents)' },
        { name: 'Sistema', value: data.system, color: 'var(--chart-system)' },
        { name: 'Otros', value: data.other, color: 'var(--chart-other)' },
    ], [data]);

    const usedSpace = data.apps + data.documents + data.system + data.other;
    const usedPercentage = ((usedSpace / data.total) * 100).toFixed(1);

    return (
        <div className="storage-chart">
            <div className="storage-chart-container">
                <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={85}
                            paddingAngle={2}
                            dataKey="value"
                            strokeWidth={0}
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                </ResponsiveContainer>
                <div className="storage-chart-center">
                    <span className="storage-chart-percentage">{usedPercentage}%</span>
                    <span className="storage-chart-label">Usado</span>
                </div>
            </div>

            {/* Storage Bar */}
            <div className="storage-bar-container">
                <div className="storage-bar">
                    {chartData.map((entry) => (
                        <div
                            key={entry.name}
                            className="storage-bar-segment"
                            style={{
                                width: `${(entry.value / data.total) * 100}%`,
                                background: entry.color,
                            }}
                            title={`${entry.name}: ${formatBytes(entry.value)}`}
                        />
                    ))}
                </div>
                <div className="storage-bar-labels">
                    <span>{formatBytes(usedSpace)} usado</span>
                    <span>{formatBytes(data.free)} libre</span>
                </div>
            </div>

            {/* Legend */}
            <div className="chart-legend">
                {chartData.map((entry) => (
                    <div key={entry.name} className="chart-legend-item">
                        <span
                            className="chart-legend-color"
                            style={{ background: entry.color }}
                        />
                        <span className="chart-legend-label">{entry.name}</span>
                        <span className="chart-legend-value">{formatBytes(entry.value)}</span>
                    </div>
                ))}
                <div className="chart-legend-item">
                    <span
                        className="chart-legend-color"
                        style={{ background: 'var(--chart-free)' }}
                    />
                    <span className="chart-legend-label">Disponible</span>
                    <span className="chart-legend-value">{formatBytes(data.free)}</span>
                </div>
            </div>
        </div>
    );
}
