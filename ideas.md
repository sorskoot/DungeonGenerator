# ideas

## Flow Generator

```mermaid
flowchart TD
    Start([Start BuildDungeon]) --> GenLayout[Generate Level Layout]
    
    subgraph Layout Generation
        GenLayout --> InitContext[Initialize Flow Context]
        InitContext --> FindResult[Find Result Node]
        FindResult --> ProcessNodes[Process Nodes]
        ProcessNodes --> |For each node| CheckVisited{Node Visited?}
        CheckVisited --> |No| ProcessIncoming[Process Incoming Nodes]
        ProcessIncoming --> ExecuteTask[Execute Node Task]
        ExecuteTask --> CheckSuccess{Success?}
        CheckSuccess --> |Yes| CheckVisited
        CheckSuccess --> |No| Retry{Can Retry?}
        Retry --> |Yes| GenLayout
        Retry --> |No| Fail[Fail Build]
        CheckVisited --> |Yes| NextNode{More Nodes?}
        NextNode --> |Yes| ProcessNodes
        NextNode --> |No| LayoutComplete[Layout Complete]
    end

    subgraph Tilemap Creation
        LayoutComplete --> InitTilemap[Initialize Tilemap]
        InitTilemap --> ProcessRooms[Process Room Nodes]
        ProcessRooms --> CreateRooms[Create Room Cells]
        CreateRooms --> ProcessCorridors[Process Connections]
        ProcessCorridors --> CreateCorridors[Create Corridors]
        CreateCorridors --> TilemapComplete[Tilemap Complete]
    end

    subgraph Marker Emission
        TilemapComplete --> InitMarkers[Initialize Marker System]
        InitMarkers --> ProcessCells[Process Tilemap Cells]
        ProcessCells --> |For each cell| CellType{Cell Type?}
        CellType --> |Wall| EmitWall[Emit Wall Marker]
        CellType --> |Floor| EmitFloor[Emit Floor Marker]
        CellType --> |Door| EmitDoor[Emit Door Marker]
        EmitWall --> CheckSpecial{Special Features?}
        EmitFloor --> CheckSpecial
        EmitDoor --> CheckSpecial
        CheckSpecial --> |Yes| EmitSpecial[Emit Special Markers]
        CheckSpecial --> |No| NextCell{More Cells?}
        EmitSpecial --> NextCell
        NextCell --> |Yes| ProcessCells
        NextCell --> |No| Complete[Build Complete]
    end

    Complete --> End([End BuildDungeon])
    Fail --> End
```

## BSP generator

```mermaid
flowchart TD
    Start[Start Generation] --> Config[Load Configuration]
    Config --> Init[Initialize Random Seed]

    subgraph BSP[Binary Space Partitioning Process]
        Init --> InitialChunk[Create Initial Root Chunk]
        InitialChunk --> SplitLoop[Recursive Splitting]
        SplitLoop --> Split{Split Chunk}
        Split -->|Left| LeftChunk[Left Chunk]
        Split -->|Right| RightChunk[Right Chunk]
        Split -->|Connect| Hallway[Hallway Chunk]
        LeftChunk --> CheckSize{Size Check}
        RightChunk --> CheckSize
        CheckSize -->|Too Large| SplitLoop
        CheckSize -->|Done| FinishBSP[Finish BSP]
    end

    subgraph Connectivity[Room Connectivity]
        FinishBSP --> FloodFill[Flood Fill Analysis]
        FloodFill --> FindIslands[Identify Isolated Areas]
        FindIslands --> CreateDoors[Create Door Connections]
        CreateDoors --> ConnectIslands[Connect All Islands]
    end

    subgraph MarkerPlacement[Marker Generation]
        ConnectIslands --> EmitMarkers[Emit Markers]
        EmitMarkers --> Ground[Ground Markers]
        EmitMarkers --> Walls[Wall Markers]
        EmitMarkers --> Doors[Door Markers]
        EmitMarkers --> Buildings[Building Markers]
    end

    MarkerPlacement --> Complete[Complete Generation]
```

The process works in these layers:

1. **Layout Generation**
    - Uses BSP to create the initial room chunks
    - Refines the spaces and adds hallways
    - Creates door connections between rooms
    - Converts the abstract layout into a tilemap representation

2. **Marker System**
    - Places different types of markers:
        - Basic markers (Ground, Walls, Doors)
        - Special markers (Locked doors, Custom elements)
        - Overlay markers (for height variations, etc.)

    - Each marker contains:
        - Position
        - Rotation
        - Type information
        - Additional metadata

3. **Geometry Generation**
    - The markers are used as instructions for placing actual geometry
    - Each marker type corresponds to specific geometry or game objects
    - The system can handle:
        - Different wall types (full tile or edge-based)
        - Special cases (one-way doors, locked doors)
        - Height variations
        - Custom elements

This layered approach makes the system very flexible because:

- The layout generation is separate from the actual geometry
- Different themes/styles can be applied using the same markers
- Custom elements can be added without changing the core generation
- The marker system acts as a middle layer between abstract layout and final geometry

Would you like me to elaborate on any of these layers or specific aspects?
