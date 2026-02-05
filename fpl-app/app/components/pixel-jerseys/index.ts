// Pixel Jersey Components for Premier League Teams
// Auto-generated collection

export interface PixelJerseyProps {
  skinTone?: string
  hairColor?: string
  hairStyle?: 'short' | 'curly' | 'long' | 'bald'
  number?: string
  isCaptain?: boolean
  className?: string
}

const defaultProps: Partial<PixelJerseyProps> = {
  skinTone: '#e0ac69',
  hairColor: '#000000',
  hairStyle: 'short',
  number: '99',
  isCaptain: false
}

// Helper to generate jersey SVG
function generateJersey(
  primaryColor: string,
  secondaryColor: string,
  props: PixelJerseyProps
): string {
  const { skinTone, hairColor, number, isCaptain } = { ...defaultProps, ...props }
  
  return `<svg viewBox="0 0 32 40" class="w-full h-full" shape-rendering="crispEdges">
  <!-- Hair -->
  <rect x="8" y="0" width="16" height="4" fill="${hairColor}"/>
  <rect x="6" y="2" width="4" height="6" fill="${hairColor}"/>
  <rect x="22" y="2" width="4" height="6" fill="${hairColor}"/>
  <!-- Face -->
  <rect x="8" y="4" width="16" height="10" fill="${skinTone}"/>
  <!-- Neck -->
  <rect x="12" y="14" width="8" height="4" fill="${skinTone}"/>
  <!-- Jersey Shoulders -->
  <rect x="4" y="18" width="4" height="10" fill="${primaryColor}"/>
  <rect x="24" y="18" width="4" height="10" fill="${primaryColor}"/>
  <!-- Jersey Body -->
  <rect x="4" y="18" width="24" height="18" fill="${primaryColor}"/>
  <!-- Collar -->
  <rect x="10" y="18" width="12" height="4" fill="${secondaryColor}"/>
  <rect x="12" y="18" width="8" height="4" fill="${primaryColor}"/>
  <!-- Number BG -->
  <rect x="10" y="24" width="12" height="10" fill="${secondaryColor}"/>
  ${isCaptain ? `<circle cx="26" cy="6" r="3" fill="#39ff14" stroke="#000" stroke-width="1"/><text x="26" y="8" text-anchor="middle" font-size="4" fill="#000" font-weight="bold">C</text>` : ''}
</svg>`
}

// Arsenal - Red/White
export const ArsenalJersey = (props: PixelJerseyProps) => 
  generateJersey('#ef0107', '#ffffff', props)

// Aston Villa - Claret/Light Blue  
export const AstonVillaJersey = (props: PixelJerseyProps) =>
  generateJersey('#7a263a', '#94bee5', props)

// Bournemouth - Red/Black
export const BournemouthJersey = (props: PixelJerseyProps) =>
  generateJersey('#e62333', '#000000', props)

// Brentford - Red/White
export const BrentfordJersey = (props: PixelJerseyProps) =>
  generateJersey('#e30613', '#ffffff', props)

// Brighton - Blue/White
export const BrightonJersey = (props: PixelJerseyProps) =>
  generateJersey('#0057b8', '#ffffff', props)

// Burnley - Claret/Light Blue
export const BurnleyJersey = (props: PixelJerseyProps) =>
  generateJersey('#6c1d45', '#99d6ea', props)

// Chelsea - Blue/White
export const ChelseaJersey = (props: PixelJerseyProps) =>
  generateJersey('#034694', '#ffffff', props)

// Crystal Palace - Blue/Red
export const CrystalPalaceJersey = (props: PixelJerseyProps) =>
  generateJersey('#1b458f', '#c4122e', props)

// Everton - Blue/White
export const EvertonJersey = (props: PixelJerseyProps) =>
  generateJersey('#003399', '#ffffff', props)

// Fulham - White/Black
export const FulhamJersey = (props: PixelJerseyProps) =>
  generateJersey('#ffffff', '#000000', props)

// Liverpool - Red/Yellow
export const LiverpoolJersey = (props: PixelJerseyProps) =>
  generateJersey('#c8102e', '#f6eb61', props)

// Luton - Orange/White
export const LutonJersey = (props: PixelJerseyProps) =>
  generateJersey('#f58025', '#ffffff', props)

// Man City - Sky Blue/White
export const ManCityJersey = (props: PixelJerseyProps) =>
  generateJersey('#6cabdd', '#ffffff', props)

// Man Utd - Red/White
export const ManUtdJersey = (props: PixelJerseyProps) =>
  generateJersey('#da291c', '#ffffff', props)

// Newcastle - Black/White (striped pattern handled differently)
export const NewcastleJersey = (props: PixelJerseyProps) => {
  const { skinTone, hairColor, number, isCaptain } = { ...defaultProps, ...props }
  return `<svg viewBox="0 0 32 40" class="w-full h-full" shape-rendering="crispEdges">
  <!-- Hair -->
  <rect x="8" y="0" width="16" height="4" fill="${hairColor}"/>
  <!-- Face -->
  <rect x="8" y="4" width="16" height="10" fill="${skinTone}"/>
  <!-- Neck -->
  <rect x="12" y="14" width="8" height="4" fill="${skinTone}"/>
  <!-- Striped Jersey -->
  <rect x="4" y="18" width="6" height="18" fill="#000000"/>
  <rect x="10" y="18" width="6" height="18" fill="#ffffff"/>
  <rect x="16" y="18" width="6" height="18" fill="#000000"/>
  <rect x="22" y="18" width="6" height="18" fill="#ffffff"/>
  <!-- Number -->
  <rect x="10" y="24" width="12" height="10" fill="#000000"/>
  ${isCaptain ? `<circle cx="26" cy="6" r="3" fill="#39ff14" stroke="#000" stroke-width="1"/><text x="26" y="8" text-anchor="middle" font-size="4" fill="#000" font-weight="bold">C</text>` : ''}
</svg>`
}

// Nottingham Forest - Red/White
export const NottinghamForestJersey = (props: PixelJerseyProps) =>
  generateJersey('#e53233', '#ffffff', props)

// Sheffield Utd - Red/White
export const SheffieldUtdJersey = (props: PixelJerseyProps) =>
  generateJersey('#ee2737', '#ffffff', props)

// Tottenham - White/Navy
export const TottenhamJersey = (props: PixelJerseyProps) =>
  generateJersey('#ffffff', '#132257', props)

// West Ham - Claret/Light Blue
export const WestHamJersey = (props: PixelJerseyProps) =>
  generateJersey('#7a263a', '#1bb1e7', props)

// Wolves - Gold/Black
export const WolvesJersey = (props: PixelJerseyProps) =>
  generateJersey('#fdb913', '#000000', props)

// Goalkeeper - Special Amber Kit
export const GoalkeeperJersey = (props: PixelJerseyProps) =>
  generateJersey('#ffb000', '#000000', props)

// Team lookup by name
export const teamJerseys: Record<string, (props: PixelJerseyProps) => string> = {
  'ARS': ArsenalJersey,
  'AVL': AstonVillaJersey,
  'BOU': BournemouthJersey,
  'BRE': BrentfordJersey,
  'BHA': BrightonJersey,
  'BUR': BurnleyJersey,
  'CHE': ChelseaJersey,
  'CRY': CrystalPalaceJersey,
  'EVE': EvertonJersey,
  'FUL': FulhamJersey,
  'LIV': LiverpoolJersey,
  'LUT': LutonJersey,
  'MCI': ManCityJersey,
  'MUN': ManUtdJersey,
  'NEW': NewcastleJersey,
  'NFO': NottinghamForestJersey,
  'SHU': SheffieldUtdJersey,
  'TOT': TottenhamJersey,
  'WHU': WestHamJersey,
  'WOL': WolvesJersey,
  'GK': GoalkeeperJersey
}

// Get jersey by team code
export function getJerseyByTeam(teamCode: string, props: PixelJerseyProps): string {
  const jerseyFn = teamJerseys[teamCode.toUpperCase()]
  if (!jerseyFn) {
    console.warn(`Unknown team code: ${teamCode}, using default`)
    return generateJersey('#888888', '#ffffff', props)
  }
  return jerseyFn(props)
}
