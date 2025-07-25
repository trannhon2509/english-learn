import React, { useState } from 'react';
import { Input, Select, Button, Modal } from 'antd';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
import styles from '@css/GridList.module.css';

const { Option } = Select;

/**
 * Common GridList component for rendering grid items with search, filter, and dropdowns.
 * Props:
 * - items: array of data objects to render
 * - renderItem: function(item) => JSX
 * - searchTerm: string
 * - onSearch: function(value)
 * - filters: array of { label, value, options: [{ value, label }] }
 * - filterValues: object { [filterKey]: value }
 * - onFilterChange: function(filterKey, value)
 * - onFilter: function() (optional)
 * - emptyText: string (optional)
 */
const GridList = ({
    items = [],
    renderItem,
    searchTerm = '',
    onSearch,
    filters = [],
    filterValues = {},
    onFilterChange,
    onFilter,
    emptyText = 'Không tìm thấy kết quả phù hợp',
    columns = 3, // Số cột mặc định là 3
}) => {
    const [filterModalOpen, setFilterModalOpen] = useState(false);

    const handleOpenFilter = () => setFilterModalOpen(true);
    const handleCloseFilter = () => setFilterModalOpen(false);

    return (
        <div className={styles.gridListContainer}>
            {/* Search input & Filter Button */}
            <div className={styles.filterSection}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
                            Tìm kiếm
                        </label>
                        <Input
                            className={styles.searchInput}
                            placeholder="Tìm kiếm..."
                            prefix={<SearchOutlined />}
                            value={searchTerm}
                            onChange={e => onSearch(e.target.value)}
                            size="large"
                            style={{ width: 280 }}
                        />
                    </div>
                    <Button
                        type="primary"
                        icon={<FilterOutlined />}
                        size="large"
                        onClick={handleOpenFilter}
                    >
                        Lọc
                    </Button>
                </div>
            </div>
            {/* Filter Modal */}
            <Modal
                title="Bộ lọc tìm kiếm"
                open={filterModalOpen}
                onCancel={handleCloseFilter}
                footer={null}
            >
                <div className={styles.filterGrid}>
                    {filters.map(filter => (
                        <div key={filter.value}>
                            <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
                                {filter.label}
                            </label>
                            <Select
                                value={filterValues[filter.value]}
                                onChange={val => onFilterChange(filter.value, val)}
                                style={{ width: '100%' }}
                                size="large"
                            >
                                {filter.options.map(opt => (
                                    <Option key={opt.value} value={opt.value}>{opt.label}</Option>
                                ))}
                            </Select>
                        </div>
                    ))}
                    {onFilter && (
                        <div>
                            <Button
                                type="primary"
                                size="large"
                                icon={<FilterOutlined />}
                                style={{ width: '100%' }}
                                onClick={() => { onFilter(); handleCloseFilter(); }}
                            >
                                Áp dụng lọc
                            </Button>
                        </div>
                    )}
                </div>
            </Modal>
            {/* Grid Section */}
            {items.length > 0 ? (
                <div
                    className={styles.gridListGrid}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${columns}, 1fr)`
                    }}
                >
                    {items.map((item, idx) => {
                        if (React.isValidElement(renderItem)) {
                            return React.cloneElement(renderItem, { vocab: item, key: idx });
                        }
                        return renderItem(item, idx);
                    })}
                </div>
            ) : (
                <div className={styles.emptyState}>
                    <SearchOutlined className={styles.emptyIcon} />
                    <div className={styles.emptyText}>{emptyText}</div>
                </div>
            )}
        </div>
    );
};

export default GridList;
