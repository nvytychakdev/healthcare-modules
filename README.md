# healthcare Modules

## Architecture

https://excalidraw.com/#json=B_i3NXjXhtQ6IJN8LB939,gyRxO7rsG2uRPDxNjy2DRw

# Module Architecture Overview

This document provides an overview of the modular architecture used to build and render patient vitals data within the application. Each module is responsible for handling a specific type of data (e.g., weight, blood pressure, temperature), and includes all necessary settings, components, and chart logic to display that data consistently.

---

## 📦 Module

The core class representing a unit of data visualization in the application. A `Module` encapsulates all logic and configuration required to fetch, process, and render a specific vitals-related chart or component. It provides a cohesive structure that bundles the following components:

- `ModuleDataSource`
- `ModuleSettings`
- `ModuleView`
- `ModuleUnits`

---

## 📊 ModuleChartRenderer

A crucial part of `ModuleView`, the `ModuleChartRenderer` defines how charts are created and rendered for a module. It includes two main methods:

### `createChart(root: string, context: ModuleChartContext): BaseChart `

- Creates a standard chart instance for a single module.
- Accepts:
  - `fields`: defines how raw data fields are mapped to the chart (e.g., x/y values, colors).
  - `units`: defines how values are formatted (e.g., display unit in tooltip).
- Returns a fully configured chart instance.

### `createCompositeChart(root: string, compositeStrategy: ChartXYValueAxisStrategy = this.getDefaultCompositeStrategy()): BaseChart`

- Creates a **comparison chart** between two modules.
- Leverages strategies and rendering logic from both modules to combine series and axes.
- Useful for visualizing relationships (e.g., compare weight and BMI on the same timeline).

---

## 🔌 ModuleDataSource

Handles all data retrieval and processing logic for a module. It abstracts the mechanism for:

- Fetching raw patient vitals data from the backend.
- Parsing and transforming that data into a structure suitable for chart rendering.
- Supporting both single-module and multi-module (composite) queries.

This keeps your data-fetching logic decoupled from rendering logic.

---

## ⚙️ ModuleSettings

Provides basic static metadata for the module. Examples:

- `moduleId`: unique module identifier.
- `moduleName`: display name.

These settings help manage modules programmatically and define how they should appear in selectors or dashboards.

---

## 🖼️ ModuleView

Contains all view-specific configurations:

- Angular component references used for dynamic rendering in templates.
- The `ModuleChartRenderer` instance used to generate the chart.
- Any additional rendering logic or templates tied to the module’s UI.

This separates view and render logic from raw data and module-level settings.

---

## 📐 ModuleUnits

A utility class that defines the supported units of measurement for the module. Responsibilities include:

- Listing supported units (e.g., kg, st lb, °C, °F).
- Providing conversion logic between units.
- Defining formatting preferences (e.g., decimal precision, label styles).
- Ensuring consistent display across components (`{value} {unit}` format).

Modules can access these units to render correctly formatted data in tooltips, labels, and summaries.
