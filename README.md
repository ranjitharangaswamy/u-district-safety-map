# U-District Community Safety Map

A community-driven safety reporting platform that allows University of Washington students, staff, and community members to report and track safety concerns around the U-District campus area. Built with React, TypeScript, and Leaflet for interactive mapping.

---

## 👥 For End Users (Students, Staff, Community Members)

### What This App Does
- **Report Safety Concerns**: Easily report lighting issues, hazards, incidents, or maintenance problems
- **View Community Reports**: See what others have reported in your area
- **Stay Informed**: Get real-time updates on safety issues around campus
- **Access Safety Tips**: Quick access to important safety information

### How to Use the App

#### **Viewing Safety Reports**
- Open the map to see colored markers indicating different types of safety concerns
- **Red markers**: Safety incidents requiring immediate attention
- **Orange markers**: Environmental hazards like broken glass or debris
- **Yellow markers**: Lighting issues or poor visibility areas
- **Blue markers**: Maintenance needs like broken infrastructure

#### **Reporting a Safety Concern**
1. Click "Add Safety Report" button
2. Click on the map where the issue is located
3. Fill out the form:
   - **Type**: Choose the category that best fits
   - **Title**: Brief description of the issue
   - **Description**: More detailed information
   - **Severity**: How urgent is this concern?
4. Submit your report

#### **Understanding Report Status**
- **Demo Reports**: Sample data (marked with blue "Demo" badge) - these cannot be modified
- **User Reports**: Reports you or others create - these can be marked as resolved
- **Verified**: Reports that have been confirmed by authorities

### Safety Information
- **Emergencies**: Call 911 immediately
- **Campus Security**: UW Police (206) 685-8973
- **SafeCampus**: Available for escort services after dark

---

## 🛡️ For Sexual Harassment Prevention Coordinators

### Platform Overview
This application serves as a community safety monitoring tool that can complement existing sexual harassment prevention and response protocols.

### Key Features for Coordinators

#### **Incident Tracking & Analysis**
- **Geographic Patterns**: Identify areas with recurring safety concerns
- **Temporal Analysis**: Track when incidents occur most frequently
- **Type Classification**: Categorize incidents by severity and type
- **Community Reporting**: Enable anonymous community input on safety issues

#### **Integration with Existing Protocols**
- **Data Export**: All incident data can be exported for analysis
- **Verification System**: Reports can be marked as verified by authorized personnel
- **Audit Trail**: Complete history of all reports and modifications
- **Privacy Protection**: No personal information is collected with reports

#### **Operational Benefits**
- **Early Warning System**: Identify potential safety issues before they escalate
- **Resource Allocation**: Use data to inform lighting, security, and maintenance decisions
- **Community Engagement**: Foster a culture of shared responsibility for campus safety
- **Documentation**: Maintain records of community-reported concerns

### Administrative Features
- **Report Management**: View, verify, and resolve community reports
- **Analytics Dashboard**: Access to incident statistics and trends
- **Communication Tools**: Ability to update community on resolved issues
- **Policy Integration**: Align with UW's sexual harassment prevention policies

### Data Privacy & Security
- **Anonymous Reporting**: No personal identifiers required
- **Secure Storage**: All data stored locally with encryption
- **Access Control**: Administrative functions require proper authorization
- **Compliance**: Designed to work within existing privacy frameworks

---

## 👨‍💻 For Developer Contributors

### Technology Stack
- **Frontend**: React 18 with TypeScript
- **Mapping**: Leaflet.js with CartoDB Voyager tiles
- **Styling**: Tailwind CSS with custom components
- **State Management**: React hooks with localStorage persistence
- **Build Tool**: Vite for fast development and optimized builds

### Project Architecture

#### **Modular Structure**
```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Application header
│   ├── IncidentList.tsx # List of recent incidents
│   ├── SafetyTips.tsx  # Safety tips sidebar
│   ├── ReportForm.tsx  # Modal for reporting incidents
│   └── IncidentDetail.tsx # Modal for incident details
├── hooks/              # Custom React hooks
│   └── useLocalStorage.ts # Local storage management
├── services/           # Business logic layer
│   └── incidentService.ts # Incident CRUD operations
├── utils/              # Utility functions
│   └── incidentUtils.ts # Incident-related utilities
├── constants/          # Configuration constants
│   └── index.ts       # App-wide constants
├── types.ts           # TypeScript type definitions
├── MapComponent.tsx   # Leaflet map component
└── App.tsx           # Main application component
```

#### **Key Design Patterns**
- **Separation of Concerns**: UI, business logic, and data persistence are separated
- **Type Safety**: Full TypeScript coverage with strict typing
- **Component Reusability**: Modular components with clear interfaces
- **Error Handling**: Graceful error handling at all layers
- **Performance**: Optimized rendering and efficient state management

### Development Setup

#### **Prerequisites**
- Node.js 16+ and npm
- Git for version control
- Code editor with TypeScript support

#### **Installation**
```bash
git clone <repository-url>
cd u-district-safety-map-v2
npm install
npm run dev
```

#### **Available Scripts**
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run type-check`: Run TypeScript compiler

### Contributing Guidelines

#### **Code Standards**
- **TypeScript**: Strict typing required for all new code
- **ESLint**: Follow project linting rules
- **Prettier**: Consistent code formatting
- **Testing**: Add tests for new features

#### **Feature Development**
1. **Components**: Create reusable components in `/components`
2. **Business Logic**: Add to `/services` for data operations
3. **Utilities**: Place pure functions in `/utils`
4. **Configuration**: Update `/constants` for app-wide settings

#### **Adding New Features**
- **New Incident Types**: Update `incidentUtils.ts` and `types.ts`
- **Map Enhancements**: Modify `MapComponent.tsx`
- **UI Components**: Create new components in `/components`
- **Data Persistence**: Extend `incidentService.ts`

#### **Testing Strategy**
- **Unit Tests**: Test utility functions and services
- **Component Tests**: Test UI components in isolation
- **Integration Tests**: Test component interactions
- **E2E Tests**: Test complete user workflows

### Performance Considerations
- **Lazy Loading**: Components load on demand
- **Memoization**: Use React.memo for expensive components
- **Bundle Optimization**: Tree-shaking and code splitting
- **Map Performance**: Efficient marker management and event handling

### Security Best Practices
- **Input Validation**: Sanitize all user inputs
- **XSS Prevention**: Use React's built-in XSS protection
- **Data Privacy**: No personal information collection
- **Secure Storage**: Encrypted localStorage usage

### Deployment
- **Static Hosting**: Can be deployed to any static hosting service
- **Environment Variables**: Configure for different environments
- **Build Optimization**: Production builds are optimized and minified
- **CDN Ready**: Assets are optimized for CDN delivery

---

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Acknowledgments

- University of Washington for the safety-focused use case
- Leaflet.js community for excellent mapping tools
- React and TypeScript communities for robust tooling
- U-District community for feedback and testing
