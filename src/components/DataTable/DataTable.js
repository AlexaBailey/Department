/*eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TablePagination,
	TextField,
	IconButton,
	InputAdornment,
	Typography,
	Grid2,
	Select,
	MenuItem,
	FormControl,
	Box,
	Checkbox,
} from '@mui/material';

import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import SwapVertIcon from '@mui/icons-material/SwapVert';

import Spinner from '../Spinner/Spinner';
import { Pagination } from '../adaptive/Pagination';
import { useMdQueries } from '../../hooks';
import { DictionaryTableMenu } from '../../routes/Dictionaries/components/DictionaryTableMenu';
import {
	DictionaryApproved,
	FacilityTableMenu,
} from '../../routes/Dictionaries/components';
import styles from './DataTable.module.scss';

function DataTable({
	fetchFunction,
	directory: {
		name: dictionaryName = '',
		table: columns,
		approved: argApproved,
		searchField,
		totalElements,
		pagination,
		loading,
		data,
	},
	actions: { setSearchAction, setPagination, setRowsPerPage },
	drawerOpen = 'no',
	hasSearch = true,
	hasTableMenu = false,
	schema = null,
	RenderRow,
	RenderActions,
	searchPlaceholder = 'Введите фамилию / имя / отчество',
}) {
	const dispatch = useDispatch();
	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm({
		resolver: schema ? yupResolver(schema) : undefined,
		mode: 'onChange',
	});

	const [firstRenderRef, setFirstRenderRef] = useState(true);
	const { isMobileList, isMobile, isDesktop } = useMdQueries();
	const location = useLocation();

	const [sortDirection, setSortDirection] = useState('asc');
	const [sortField, setSortField] = useState('id');

	const [search, setSearch] = useState('');
	const [curPage, setCurPage] = useState(pagination.page);
	const [totals, setTotals] = useState(totalElements);

	const [selectedItems, setSelectedItems] = useState(new Map());

	const isChecked = (id) => selectedItems.has(id);

	const isAllSelected = useMemo(() => {
		return data.length > 0 && selectedItems.size === data.length;
	}, [data.length, selectedItems.size]);

	const isSomeSelected = useMemo(() => {
		return selectedItems.size > 0 && selectedItems.size < data.length;
	}, [data.length, selectedItems.size]);

	useEffect(() => {
		setSelectedItems(new Map());
	}, [dictionaryName]);

	const handleCheckboxChange = (event, item) => {
		event.stopPropagation();
		setSelectedItems((prevSelected) => {
			const newSelected = new Map(prevSelected);
			if (event.target.checked) {
				newSelected.set(item.id, item);
			} else {
				newSelected.delete(item.id);
			}
			return newSelected;
		});
	};

	const handleSelectAllChange = (event) => {
		if (event.target.checked) {
			const newSelected = new Map();
			data.forEach((row) => newSelected.set(row.id, row));
			setSelectedItems(newSelected);
		} else {
			setSelectedItems(new Map());
		}
	};

	useEffect(() => {
		if (firstRenderRef) {
			setCurPage(0);
			setFirstRenderRef(false);
			dispatch(setPagination({ ...pagination, page: 0 }));
		}
	}, [location.pathname]);

	useEffect(() => {
		if (dictionaryName) {
			setValue('search', '');
			setSearch('');
			fetchData('', pagination.page, pagination.size, 'id,asc', argApproved);
		}
	}, [dictionaryName, argApproved]);

	useEffect(() => {
		if (dictionaryName) {
			setSelectedItems(new Map());
		}
	}, [dictionaryName, pagination]);

	useEffect(() => {
		if (!firstRenderRef && !dictionaryName) {
			fetchData(search, pagination.page, pagination.size);
		}
	}, [pagination, sortDirection, sortField, firstRenderRef]);

	const checkIfDict = async (
		searchValue = search,
		page = pagination.page,
		size = pagination.size,
		newSort,
	) => {
		if (dictionaryName) {
			await fetchData(searchValue, page, size, newSort, argApproved);
		}
	};

	const fetchData = async (
		searchValue = '',
		page = pagination.page,
		size = pagination.size,
		newSort = `${sortField},${sortDirection}`,
		approved,
	) => {
		try {
			const result = await dispatch(
				fetchFunction({
					searchField: searchField,
					approved: approved,
					dictionaryName: dictionaryName,
					pagination: { page, size },
					search: searchValue,
					sort: newSort,
				}),
			).unwrap();

			setCurPage(result.pageable.pageNumber + 1);
			setTotals(result.totalElements);
		} catch (error) {}
	};

	const handleChangePage = async (newPage) => {
		dispatch(setPagination({ ...pagination, page: newPage }));
		await checkIfDict(search, newPage, pagination.size);
	};

	const handleChangeRowsPerPage = async (event) => {
		const rowsPerPage = parseInt(event.target.value, 10);
		dispatch(setRowsPerPage(rowsPerPage));
		await checkIfDict(search, pagination.page, rowsPerPage);
	};

	const handleSort = async (column) => {
		if (column && column.sortable) {
			let newSortField = column.sortField ?? column.id ?? column.fid;
			setSortField(newSortField);
			let newSortDirection = sortDirection === 'desc' ? 'asc' : 'desc';
			setSortDirection(newSortDirection);

			await checkIfDict(
				search,
				pagination.page,
				pagination.size,
				`${newSortField},${newSortDirection}`,
			);
		}
	};

	const handleSearch = async (data) => {
		setSearch(data.search);

		await checkIfDict(data.search, 0, pagination.size);
		await dispatch(setSearchAction(data.search));
		await dispatch(setPagination({ ...pagination, page: 0 }));
	};

	const handleClear = async () => {
		setValue('search', '');
		setSortField('id');
		setSortDirection('asc');
		setSearch('');

		dispatch(setPagination({ ...pagination, page: 0 }));
		await checkIfDict('', 0, pagination.size);
	};
	const handleKeyDown = async (event) => {
		const searchValue = event.target.value;
		setSearch(searchValue);
		if (event.key === 'Enter') {
			await handleSearch({ search: searchValue });
		}
	};

	if (loading || curPage === 0)
		return (
			<div className="min-h-[74vh] w-full relative">
				<Spinner />
			</div>
		);

	return (
		<div
			className={`${drawerOpen !== 'no' && styles.drawer} ${drawerOpen && styles.open} ${styles.wrapper}`}
		>
			<Paper elevation={3} className={styles.paper}>
				<Grid2
					container
					className="gap-3"
					justifyContent="space-between"
					spacing={!isMobileList ? 2 : 0}
					alignItems="center"
				>
					<Grid2
						item="true"
						xs={isMobileList ? 9 : 9}
						className=" flex-1 pr-4 flex gap-2 items-center"
					>
						{hasSearch && (
							<Controller
								name="search"
								control={control}
								defaultValue=""
								render={({ field }) => (
									<TextField
										{...field}
										label={searchPlaceholder}
										variant="outlined"
										error={!!errors.search}
										helperText={errors.search?.message}
										onKeyDown={handleKeyDown}
										fullWidth
										sx={{
											height: '56px',
											'& .MuiOutlinedInput-root': {
												backgroundColor: '#f0f0f0',
											},
										}}
										slotProps={{
											input: {
												endAdornment: (
													<InputAdornment position="end">
														<IconButton
															onClick={handleClear}
															style={{
																visibility: field.value ? 'visible' : 'hidden',
															}}
														>
															<CloseIcon />
														</IconButton>
													</InputAdornment>
												),
											},

											inputLabel: {
												shrink: !!field.value,
											},

											formHelperText: {
												sx: {
													fontSize: '0.875rem',
													position: 'relative',
												},
											},
										}}
									/>
								)}
							/>
						)}
						{!isMobileList && hasSearch && (
							<IconButton
								onClick={handleSubmit(handleSearch)}
								className={styles.search}
							>
								<SearchIcon />
							</IconButton>
						)}
					</Grid2>

					<Grid2
						item="true"
						xs={isMobileList ? 2 : 3}
						style={{
							textAlign: 'right',
							display: 'flex',
							alignItems: 'center',
							gap: '10px',
						}}
					>
						{RenderActions && <RenderActions />}
						{hasTableMenu ? (
							<DictionaryTableMenu
								sort={`${sortField},${sortDirection}`}
								approved={argApproved}
								search={search}
								setSelectedItems={setSelectedItems}
								pagination={pagination}
								selectedItems={selectedItems}
								dictionaryName={dictionaryName}
							/>
						) : (
							<FacilityTableMenu
								search={search}
								setSelectedItems={setSelectedItems}
								pagination={pagination}
								selectedItems={selectedItems}
								dictionaryName={dictionaryName}
							/>
						)}
					</Grid2>
				</Grid2>

				{isMobileList && (
					<Grid2
						container
						spacing={2}
						justifyContent="space-between"
						alignItems="center"
						sx={{
							marginTop: `${isDesktop ? (errors.search ? '60px' : '47px') : errors.search ? '30px' : '15px'}`,
						}}
					>
						<Grid2
							item="true"
							xs={6}
							style={{ display: 'flex', justifyContent: 'flex-start' }}
						>
							<IconButton
								onClick={() => {
									const selectedColumn = columns.find(
										(column) => (column.sortField ?? column.id) === sortField,
									);
									handleSort(selectedColumn);
								}}
							>
								<SwapVertIcon />
							</IconButton>
							<FormControl style={{ minWidth: '40%' }}>
								<Select
									value={sortField}
									onChange={(e) => setSortField(e.target.value)}
									displayEmpty
									renderValue={(selected) => {
										const selectedColumn = columns.find(
											(column) => (column.sortField ?? column.id) === selected,
										);
										return (
											<span
												style={{
													display: 'inline-block',
													maxWidth: `${isMobile ? '80px' : '100%'}`,
													whiteSpace: 'nowrap',
													overflow: 'hidden',
													textOverflow: 'ellipsis',
												}}
											>
												{selectedColumn
													? selectedColumn.label
													: 'Сортировать по'}
											</span>
										);
									}}
								>
									{columns.map((column) => (
										<MenuItem
											key={column.id}
											value={column.sortField ?? column.id}
										>
											{column.label}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid2>

						<Grid2 item="true" xs={3}>
							<FormControl fullWidth>
								<Select
									value={pagination.size}
									onChange={handleChangeRowsPerPage}
									displayEmpty
									renderValue={(selected) => selected || 10}
								>
									<MenuItem value={10}>10</MenuItem>
									<MenuItem value={25}>25</MenuItem>
									<MenuItem value={50}>50</MenuItem>
								</Select>
							</FormControl>
						</Grid2>
					</Grid2>
				)}
				<TableContainer
					className={`${styles.table} ${!hasSearch && styles.nosearch}`}
				>
					<Table stickyHeader>
						<TableHead>
							<TableRow>
								{hasTableMenu && totalElements > 0 && (
									<TableCell className={` ${styles.check}  `}>
										<Checkbox
											color="primary"
											indeterminate={isSomeSelected}
											checked={!!isAllSelected}
											onClick={(e) => handleSelectAllChange(e)}
										/>
									</TableCell>
								)}
								{columns.map((column) => (
									<TableCell
										className={`${styles.cell} text-wrap text-center  `}
										key={column.id}
										onClick={() => handleSort(column)}
										style={{ cursor: 'pointer' }}
									>
										{column.label}
										{!isMobileList && column.sortable && (
											<IconButton
												sx={{
													ml: '10px',
													'&:hover .icon': {
														opacity: 1,
														transition: '100ms',
													},
												}}
												size="small"
											>
												{sortDirection === 'desc' ? (
													<ArrowDropDownIcon
														fontSize="small"
														className="icon"
														sx={{
															height: '1rem',
															fontWeight: 'bold',
															color: 'black',
															opacity: column.id === sortField ? 1 : 0,
															transition: '100ms',
														}}
														color={
															column.id === sortField ? 'primary' : 'default'
														}
													/>
												) : (
													<ArrowDropUpIcon
														className="icon"
														fontSize="small"
														sx={{
															height: '1rem',
															fontWeight: 'bold',
															color: 'black',
															opacity: column.id === sortField ? 1 : 0,
															transition: '100ms',
														}}
														color={
															column.id === sortField ? 'primary' : 'default'
														}
													/>
												)}
											</IconButton>
										)}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{data.length === 0 ? (
								<TableRow>
									<TableCell colSpan={columns.length}>
										<Typography align="center">Данных не найдено</Typography>
									</TableCell>
								</TableRow>
							) : (
								data.map((item) => (
									<RenderRow
										key={item.id}
										item={item}
										hasTableMenu={hasTableMenu}
										handleCheckboxChange={handleCheckboxChange}
										isChecked={isChecked}
									/>
								))
							)}
						</TableBody>
					</Table>
				</TableContainer>

				<Box
					display="flex"
					alignItems="center"
					justifyContent="space-between"
					width="100%"
				>
					{!isMobile &&
						(dictionaryName === 'street' ||
							dictionaryName === 'settlement') && (
							<DictionaryApproved
								pagination={pagination}
								approved={argApproved}
							/>
						)}

					<Box
						display="flex"
						flex="1"
						justifyContent={`${!isMobileList ? 'flex-end' : 'center'}`}
					>
						{!isMobileList ? (
							<TablePagination
								rowsPerPageOptions={[10, 25, 50]}
								component="div"
								count={totals}
								rowsPerPage={pagination.size}
								page={pagination.page}
								onPageChange={handleChangePage}
								onRowsPerPageChange={handleChangeRowsPerPage}
								labelRowsPerPage="Строк на страницу"
								labelDisplayedRows={() =>
									`${totals === 0 ? 0 : curPage} из ${Math.ceil(totals / pagination.size)}`
								}
								ActionsComponent={() => (
									<Pagination
										curPage={curPage}
										totalElements={totals}
										pagination={pagination}
										search={search}
										handleChangePage={handleChangePage}
									/>
								)}
							/>
						) : (
							<Pagination
								curPage={curPage}
								totalElements={totals}
								pagination={pagination}
								handleChangePage={handleChangePage}
								search={search}
							>
								<Typography style={{ margin: '0 10px' }}>
									{totals === 0 ? 0 : curPage} из{' '}
									{Math.ceil(totals / pagination.size)}
								</Typography>
							</Pagination>
						)}
					</Box>
				</Box>
			</Paper>
		</div>
	);
}

export default DataTable;
