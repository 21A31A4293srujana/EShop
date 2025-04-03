# Electronics Store E-commerce Website

A modern e-commerce website for electronic appliances built with .NET and Angular.

## Project Structure

- `ElectronicsStore.API/` - Backend Web API project
- `ElectronicsStore.Web/` - Frontend Angular project

## Prerequisites

- .NET 8.0 SDK
- Node.js (v18 or later)
- Angular CLI
- SQL Server (LocalDB or Express)

## Getting Started

### Backend Setup

1. Navigate to the API project directory:
   ```bash
   cd ElectronicsStore.API
   ```

2. Restore dependencies:
   ```bash
   dotnet restore
   ```

3. Run the API:
   ```bash
   dotnet run
   ```

The API will be available at `https://localhost:7001` and `http://localhost:5001`

### Frontend Setup

1. Navigate to the Web project directory:
   ```bash
   cd ElectronicsStore.Web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   ng serve
   ```

The application will be available at `http://localhost:4200`

## Features

- Product catalog with categories
- User authentication and authorization
- Shopping cart functionality
- Order management
- Responsive design
- Modern UI with Angular Material

## Development

- Backend: C#, .NET 8.0, Entity Framework Core
- Frontend: Angular 19, TypeScript, SCSS, Angular Material
- Database: SQL Server 