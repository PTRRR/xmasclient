export function p5 (p5) {
  // Add graph to p5
  const gcode = function (p5) {
    let commands = []
    let scaleFactor = 1

    function clear () {
      commands = []
    }

    function setScaleFactor (newScaleFactor) {
      scaleFactor = newScaleFactor
    }

    function getLastPositionCommand () {
      if (commands.length > 0) {
        for (let i = commands.length - 1; i >= 0; i--) {
          const { gCommand, mCommand } = commands[i]
          const command = gCommand || mCommand
          if (command === 'G0' || command === 'G1') {
            return commands[i]
          }
        }

        return null
      }
    }

    function addCommand (gCommand, args) {
      commands.push({
        gCommand,
        args
      })

      return this
    }

    function getOptimizedCommands () {
      const positionFilteredCommands = []
      let index = 0
      let lastPos = null

      // Remove same positions
      while (commands[index]) {
        const { gCommand, mCommand, args } = commands[index]
        const command = gCommand || mCommand

        if (command === 'G0' || command === 'G1') {
          const pos = args
          if (lastPos) {
            const dist = Math.sqrt(
              Math.pow(pos.x - lastPos.x, 2) + Math.pow(pos.y - lastPos.y, 2)
            )
            if (dist > 0) {
              positionFilteredCommands.push(commands[index])
            }
          } else {
            positionFilteredCommands.push(commands[index])
          }

          lastPos = args
        } else {
          positionFilteredCommands.push(commands[index])
        }
        index++
      }

      // Remove unusefull draw commands
      index = 0
      const drawFilteredCommands = []

      while (positionFilteredCommands[index + 1]) {
        const { gCommand, mCommand } = positionFilteredCommands[index]
        const command = gCommand || mCommand
        if (command === 'G10' || command === 'G11') {
          const nextCommand = positionFilteredCommands[index + 1].gCommand

          if (command === 'G10' && nextCommand === 'G11') {
            index++
          } else {
            drawFilteredCommands.push(positionFilteredCommands[index])
          }
        } else {
          drawFilteredCommands.push(positionFilteredCommands[index])
        }
        index++
      }

      return drawFilteredCommands
    }

    function getString () {
      const optimizedCommands = getOptimizedCommands()
      let string = ''
      let index = 1
      for (const command of optimizedCommands) {
        const { gCommand, mCommand, args } = command
        const commandName = gCommand || mCommand

        // Join the command in one string
        string += `N${index} ${commandName}`
        for (const [key, arg] of Object.entries(args || {})) {
          if (commandName === 'G0' || commandName === 'G1') {
            string += ` ${key.toUpperCase()}${arg * scaleFactor}`
          } else {
            string += ` ${key.toUpperCase()}${arg}`
          }
        }
        string += '\n'

        index++
      }
      return string
    }

    return {
      clear,
      getLastPositionCommand,
      setScaleFactor,
      addCommand,
      getString
    }
  }

  p5.gcode = gcode(p5)
}
