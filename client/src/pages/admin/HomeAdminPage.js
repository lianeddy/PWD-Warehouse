import React from "react";
import { accentColor, primaryColor, surfaceColor } from "../../helpers";
import { ResponsiveLine } from "@nivo/line";

const x = 1000000;
const date = new Date();

const data = [
	{
		id: 2019,
		color: "red",
		data: [
			{ x: "Jan", y: 2 },
			{ x: "Feb", y: 10 },
			{ x: "Mar", y: 67 },
			{ x: "Apr", y: 25 },
			{ x: "May", y: 49 },
			{ x: "Jun", y: 115 },
			{ x: "Jul", y: 14 },
			{ x: "Aug", y: 122 },
			{ x: "Sep", y: 45 },
			{ x: "Oct", y: 53 },
			{ x: "Nov", y: 70 },
			{ x: "Dec", y: 86 },
		],
	},
	{
		id: 2020,
		color: "blue",
		data: [
			{ x: "Jan", y: 210 },
			{ x: "Feb", y: 421 },
			{ x: "Mar", y: 156 },
			{ x: "Apr", y: 122 },
			{ x: "May", y: 321 },
			{ x: "Jun", y: 156 },
			{ x: "Jul", y: 72 },
			{ x: "Aug", y: 298 },
			{ x: "Sep", y: 456 },
			{ x: "Oct", y: 602 },
			{ x: "Nov", y: 321 },
			{ x: "Dec", y: 159 },
		],
	},
];

const HomeAdminPage = ({ current }) => {
	return (
		<div
			style={{
				minHeight: "100vh",
				backgroundColor: primaryColor,
				padding: 15,
				display: current === 0 ? "block" : "none",
			}}
		>
			<div
				className="d-flex justify-content-between"
				style={{ marginBottom: 30 }}
			>
				<div
					style={{
						height: 200,
						backgroundColor: accentColor,
						borderRadius: 10,
						maxWidth: 300,
						width: "24%",
					}}
				>
					<div
						className="d-flex justify-content-between"
						style={{ height: "100%", padding: 20 }}
					>
						<div className="d-flex align-items-center">
							<div
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									width: 60,
									height: 60,
									borderRadius: 50,
									backgroundColor: "rgba(0,0,0,0.15)",
								}}
							>
								<i
									className="bi bi-cart3"
									style={{
										fontSize: 25,
										color: "white",
									}}
								></i>
							</div>
						</div>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "space-evenly",
								alignItems: "flex-end",
							}}
						>
							<div className="d-flex flex-column align-items-end">
								<div
									style={{
										fontSize: 22,
										color: "white",
									}}
								>
									Orders
								</div>
								<div
									style={{ backgroundColor: "white", width: 30, height: 3 }}
								></div>
							</div>
							<div style={{ fontSize: 16, color: "white" }}>
								{x.toLocaleString()}
							</div>
						</div>
					</div>
				</div>
				<div
					style={{
						height: 200,
						backgroundColor: accentColor,
						borderRadius: 10,
						maxWidth: 300,
						width: "24%",
					}}
				>
					<div
						className="d-flex justify-content-between"
						style={{ height: "100%", padding: 20 }}
					>
						<div className="d-flex align-items-center">
							<div
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									width: 60,
									height: 60,
									borderRadius: 50,
									backgroundColor: "rgba(0,0,0,0.15)",
								}}
							>
								<i
									className="bi bi-people"
									style={{
										fontSize: 25,
										color: "white",
									}}
								></i>
							</div>
						</div>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "space-evenly",
								alignItems: "flex-end",
							}}
						>
							<div className="d-flex flex-column align-items-end">
								<div
									style={{
										fontSize: 22,
										color: "white",
									}}
								>
									Client
								</div>
								<div
									style={{ backgroundColor: "white", width: 30, height: 3 }}
								></div>
							</div>
							<div style={{ fontSize: 16, color: "white" }}>
								{x.toLocaleString()}
							</div>
						</div>
					</div>
				</div>
				<div
					style={{
						height: 200,
						backgroundColor: accentColor,
						borderRadius: 10,
						maxWidth: 300,
						width: "24%",
					}}
				>
					<div
						className="d-flex justify-content-between"
						style={{ height: "100%", padding: 20 }}
					>
						<div className="d-flex align-items-center">
							<div
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									width: 60,
									height: 60,
									borderRadius: 50,
									backgroundColor: "rgba(0,0,0,0.15)",
								}}
							>
								<i
									className="bi bi-graph-up"
									style={{
										fontSize: 25,
										color: "white",
									}}
								></i>
							</div>
						</div>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "space-evenly",
								alignItems: "flex-end",
							}}
						>
							<div className="d-flex flex-column align-items-end">
								<div
									style={{
										fontSize: 22,
										color: "white",
									}}
								>
									Sales
								</div>
								<div
									style={{ backgroundColor: "white", width: 30, height: 3 }}
								></div>
							</div>
							<div style={{ fontSize: 16, color: "white" }}>
								{x.toLocaleString()}
							</div>
						</div>
					</div>
				</div>
				<div
					style={{
						height: 200,
						backgroundColor: accentColor,
						borderRadius: 10,
						maxWidth: 300,
						width: "24%",
					}}
				>
					<div
						className="d-flex justify-content-between"
						style={{ height: "100%", padding: 20 }}
					>
						<div className="d-flex align-items-center">
							<div
								style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									width: 60,
									height: 60,
									borderRadius: 50,
									backgroundColor: "rgba(0,0,0,0.15)",
								}}
							>
								<i
									className="bi bi-wallet2"
									style={{
										fontSize: 25,
										color: "white",
									}}
								></i>
							</div>
						</div>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "space-evenly",
								alignItems: "flex-end",
							}}
						>
							<div className="d-flex flex-column align-items-end">
								<div
									style={{
										fontSize: 22,
										color: "white",
									}}
								>
									Profit
								</div>
								<div
									style={{ backgroundColor: "white", width: 30, height: 3 }}
								></div>
							</div>
							<div style={{ fontSize: 16, color: "white" }}>
								{x.toLocaleString()}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					height: 400,
				}}
			>
				<div
					style={{
						width: "65%",
						backgroundColor: "white",
						borderRadius: 10,
						boxShadow: "0 0 5px 1px rgba(0,0,0,0.3)",
					}}
				>
					<ResponsiveLine
						data={data}
						margin={{ top: 50, right: 100, bottom: 50, left: 100 }}
						xScale={{ type: "point" }}
						yScale={{
							type: "linear",
							min: 0,
							max: "auto",
							stacked: true,
							reverse: false,
						}}
						min={-1000}
						yFormat=" >-.0f"
						curve="catmullRom"
						colors={{ scheme: "dark2" }}
						lineWidth={5}
						enableArea={true}
						areaBaselineValue={10}
						areaOpacity={0.5}
						axisTop={null}
						axisRight={null}
						pointSize={10}
						pointColor={{ theme: "background" }}
						pointBorderWidth={3}
						pointBorderColor={{ from: "color", modifier: [] }}
						pointLabelYOffset={-12}
						enableGridX={false}
						enableGridY={false}
						useMesh={true}
						motionConfig="molasses"
						legends={[
							{
								anchor: "top-right",
								direction: "column",
								justify: true,
								translateX: 0,
								translateY: 0,
								itemsSpacing: 0,
								itemDirection: "left-to-right",
								itemWidth: 50,
								itemHeight: 18,
								itemOpacity: 0.75,
								symbolSize: 20,
								symbolShape: "circle",
								symbolBorderColor: "rgba(0, 0, 0, .5)",
								effects: [
									{
										on: "hover",
										style: {
											itemBackground: "rgba(0, 0, 0, .03)",
											itemOpacity: 1,
										},
									},
								],
							},
						]}
					/>
				</div>
				<div
					style={{
						width: "34%",
						height: "100%",
						backgroundColor: surfaceColor,
						borderRadius: 10,
						boxShadow: "0 0 8px 1px rgba(0,0,0,0.3)",
					}}
				>
					<div className="d-flex justify-content-between align-items-center">
						<div>
							<div>Earning</div>
							<div>Today, </div>
						</div>
						<div>10000</div>
					</div>
					<div className="d-flex justify-content-between align-items-center">
						<div>
							<div>Earning</div>
							<div>Weekly</div>
						</div>
						<div>10000</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomeAdminPage;
