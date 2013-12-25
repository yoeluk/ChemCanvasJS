do ->
  paper.install(this)
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
    mobBrowser = true
  else mobBrowser = false
  window.ChemCanvas = do ->
    "use strict"

    c = {}
    c.items = {}
    c.calcs = {}
    c.io = {}
    c.pencil =
      events: {}
      states: {}
    VERSION = "0.9"
    c.version = ->
      VERSION
    c

  class Element
      constructor: (@symbol, @name, @atomicNumber, @fillValence, @color, @valence, @atomicMass, @electronicConf) ->

  ChemCanvas.ELEMENTS = do ->
    "use strict"

    A = {}
    A.H = new Element('H', 'Hydrogen', 1, false, '#808080', 1, 1.0079, '1s1')
    A.He = new Element('He', 'Helium', 2, false, '#849B9B', 0, 4.0026, '1s2')
    A.Li = new Element('Li', 'Lithium', 3, false, '#C87EFA', 1, 6.941, '1s2&middot;2s1')
    A.Be = new Element('Be', 'Beryllium', 4, false, '#82AB00', 2, 9.01218, '1s2&middot;2s2')
    A.B = new Element('B', 'Boron', 5, true, '#F090A0', 3, 10.81, '1s2&middot;2s2&middot;2p1')
    A.C = new Element('C', 'Carbon', 6, true, 'null', 4, 12.011, '1s2&middot;2s2&middot;2p2')
    A.N = new Element('N', 'Nitrogen', 7, true, '#304FF7', 3, 14.0067, '1s2&middot;2s2&middot;2p3')
    A.O = new Element('O', 'Oxygen', 8, true, '#FF0D0D', 2, 15.9994, '1s2&middot;2s2&middot;2p4')
    A.F = new Element('F', 'Fluorine', 9, true, '#228B22', 1, 18.998403, '1s2&middot;2s2&middot;2p5')
    A.Ne = new Element('Ne', 'Neon', 10, false, '#7B9CA8', 0, 20.179, '1s2&middot;2s2&middot;2p6')
    A.Na = new Element('Na', 'Sodium', 11, false, '#AB5CF2', 1, 22.98977, '[Ne]3s1')
    A.Mg = new Element('Mg', 'Magnesium', 12, false, '#61B400', 0, 24.305, '[Ne]3s2')
    A.Al = new Element('Al', 'Aluminum', 13, false, '#A79191', 0, 26.98154, '[Ne]3s2&middot;3p1')
    A.Si = new Element('Si', 'Silicon', 14, true, '#B09276', 4, 28.0855, '[Ne]3s2&middot;3p2')
    A.P = new Element('P', 'Phosphorus', 15, true, '#FF8000', 3, 30.97376, '[Ne]3s2&middot;3p3')
    A.S = new Element('S', 'Sulfur', 16, true, '#FFC832', 2, 32.06, '[Ne]3s2&middot;3p4')
    A.Cl = new Element('Cl', 'Chlorine', 17, true, '#1DC51D', 1, 35.453, '[Ne]3s2&middot;3p5')
    A.Ar = new Element('Ar', 'Erbium', 68, false, '#63A2B0', 0, 39.948, '[Ne]3s2&middot;3p6')
    A.K = new Element('K', 'Potassium', 19, false, '#8F40D4', 0, 39.0983, '[Ar]4s1')
    A.Ca = new Element('Ca', 'Calcium', 20, false, '#2FC300', 0, 40.08, '[Ar]4s2')
    A.Sc = new Element('Sc', 'Scandium', 21, false, '#969696', 0, 44.9559, '[Ar]3d1&middot;4s2')
    A.Ti = new Element('Ti', 'Titanium', 22, false, '#94969A', 1, 47.9, '[Ar]3d2&middot;4s2')
    A.V = new Element('V', 'Vanadium', 23, false, '#96969A', 1, 50.9415, '[Ar]3d3&middot;4s2')
    A.Cr = new Element('Cr', 'Chromium', 24, false, '#8796C3', 2, 51.996, '[Ar]3d5&middot;4s1')
    A.Mn = new Element('Mn', 'Manganese', 25, false, '#9C7AC7', 3, 54.938, '[Ar]3d5&middot;4s2')
    A.Fe = new Element('Fe', 'Iron', 26, false, '#E06633', 2, 55.847, '[Ar]3d6&middot;4s2')
    A.Co = new Element('Co', 'Cobalt', 27, false, '#DB8293', 1, 58.9332, '[Ar]3d7&middot;4s2')
    A.Ni = new Element('Ni', 'Nickel', 28, false, '#45B645', 1, 58.7, '[Ar]3d8&middot;4s2')
    A.Cu = new Element('Cu', 'Copper', 29, false, '#C78033', 0, 63.546, '[Ar]3d10&middot;4s1')
    A.Zn = new Element('Zn', 'Zinc', 30, false, '#7D80B0', 0, 65.38, '[Ar]3d10&middot;4s2')
    A.Ga = new Element('Ga', 'Gallium', 31, false, '#BD8C8C', 0, 69.72, '[Ar]3d10&middot;4s2&middot;4p1')
    A.Ge = new Element('Ge', 'Germanium', 32, false, '#668F8F', 4, 72.59, '[Ar]3d10&middot;4s2&middot;4p2')
    A.As = new Element('As', 'Einsteinium', 99, false, '#BD80E3', 0, 74.9216, '[Ar]3d10&middot;4s2&middot;4p3')
    A.Se = new Element('Se', 'Selenium', 34, true, '#E28F00', 2, 78.96, '[Ar]3d10&middot;4s2&middot;4p4')
    A.Br = new Element('Br', 'Bromine', 35, true, '#A62929', 1, 79.904, '[Ar]3d10&middot;4s2&middot;4p5')
    A.Kr = new Element('Kr', 'Krypton', 36, false, '#53A6BC', 0, 83.8, '[Ar]3d10&middot;4s2&middot;4p6')
    A.Rb = new Element('Rb', 'Rubidium', 37, false, '#702EB0', 0, 85.4678, '[Kr]5s1')
    A.Sr = new Element('Sr', 'Strontium', 38, false, '#00D000', 0, 87.62, '[Kr]5s2')
    A.Y = new Element('Y', 'Yttrium', 39, false, '#5FA4A4', 0, 88.9059, '[Kr]4d1&middot;5s2')
    A.Zr = new Element('Zr', 'Zirconium', 40, false, '#6BA2A2', 0, 91.22, '[Kr]4d2&middot;5s2')
    A.Nb = new Element('Nb', 'Niobium', 41, false, '#61A4A9', 1, 92.9064, '[Kr]4d4&middot;5s1')
    A.Mo = new Element('Mo', 'Molybdenum', 42, false, '#4EA9A9', 2, 95.94, '[Kr]4d5&middot;5s1')
    A.Tc = new Element('Tc', 'Technetium', 43, false, '#3B9E9E', 3, 98, '[Kr]4d5&middot;5s2')
    A.Ru = new Element('Ru', 'Ruthenium', 44, false, '#248F8F', 2, 101.07, '[Kr]4d7&middot;5s1')
    A.Rh = new Element('Rh', 'Rhodium', 45, false, '#0A7D8C', 1, 102.9055, '[Kr]4d8&middot;5s1')
    A.Pd = new Element('Pd', 'Palladium', 46, false, '#006985', 0, 106.4, '[Kr]4d10')
    A.Ag = new Element('Ag', 'Silver', 47, false, '#969696', 0, 107.868, '[Kr]4d10&middot;5s1')
    A.Cd = new Element('Cd', 'Cadmium', 48, false, '#AE9462', 0, 112.41, '[Kr]4d10&middot;5s2')
    A.In = new Element('In', 'Indium', 49, false, '#A67573', 0, 114.82, '[Kr]4d10&middot;5s2&middot;5p1')
    A.Sn = new Element('Sn', 'Tin', 50, false, '#668080', 4, 118.69, '[Kr]4d10&middot;5s2&middot;5p2')
    A.Sb = new Element('Sb', 'Antimony', 51, false, '#9E63B5', 3, 121.75, '[Kr]4d10&middot;5s2&middot;5p3')
    A.Te = new Element('Te', 'Tellurium', 52, true, '#D47A00', 2, 127.6, '[Kr]4d10&middot;5s2&middot;5p4')
    A.I = new Element('I', 'Iodine', 53, true, '#940094', 1, 126.9045, '[Kr]4d10&middot;5s2&middot;5p5')
    A.Xe = new Element('Xe', 'Xenon', 54, false, '#429EB0', 0, 131.3, '[Kr]4d10&middot;5s2&middot;5p6')
    A.Cs = new Element('Cs', 'Cesium', 55, false, '#57178F', 0, 132.9054, '[Xe]6s1')
    A.Ba = new Element('Ba', 'Barium', 56, false, '#00C900', 0, 137.33, '[Xe]6s2')
    A.La = new Element('La', 'Lanthanum', 57, false, '#57A4C5', 0, 138.9055, '[Xe]5d1&middot;6s2')
    A.Ce = new Element('Ce', 'Cerium', 58, false, '#989877', 0, 140.12, '[Xe]4f1&middot;5d1&middot;6s2')
    A.Pr = new Element('Pr', 'Praseodymium', 59, false, '#869D7B', 0, 140.9077, '[Xe]4f3&middot;6s2')
    A.Nd = new Element('Nd', 'Neodymium', 60, false, '#7DA07D', 0, 144.24, '[Xe]4f4&middot;6s2')
    A.Pm = new Element('Pm', 'Promethium', 61, false, '#69A581', 0, 145, '[Xe]4f5&middot;6s2')
    A.Sm = new Element('Sm', 'Samarium', 62, false, '#5EA883', 0, 150.4, '[Xe]4f6&middot;6s2')
    A.Eu = new Element('Eu', 'Europium', 63, false, '#43B089', 0, 153, '[Xe]4f7&middot;6s2')
    A.Gd = new Element('Gd', 'Gadolinium', 64, false, '#31B48D', 0, 157.25, '[Xe]4f7&middot;5d1&middot;6s2')
    A.Tb = new Element('Tb', 'Terbium', 65, false, '#23B890', 0, 158.9254, '[Xe]4f9&middot;6s2')
    A.Dy = new Element('Dy', 'Dysprosium', 66, false, '#17BB92', 0, 162.5, '[Xe]4f10&middot;6s2')
    A.Ho = new Element('Ho', 'Holmium', 67, false, '#00C578', 0, 164.9304, '[Xe]4f11&middot;6s2')
    A.Er = new Element('Er', 'Erbium', 68, false, '#00C765', 0, 167.26, '[Xe]4f12&middot;6s2')
    A.Tm = new Element('Tm', 'Thulium', 69, false, '#00C94E', 0, 168.9342, '[Xe]4f13&middot;6s2')
    A.Yb = new Element('Yb', 'Ytterbium', 70, false, '#00BF38', 0, 173.04, '[Xe]4f14&middot;6s2')
    A.Lu = new Element('Lu', 'Lutetium', 71, false, '#00AB24', 0, 174.967, '[Xe]4f14&middot;5d1&middot;6s2')
    A.Hf = new Element('Hf', 'Hafnium', 72, false, '#42A8DC', 0, 178.49, '[Xe]4f14&middot;5d2&middot;6s2')
    A.Ta = new Element('Ta', 'Tantalum', 73, false, '#4BA2F9', 1, 180.9479, '[Xe]4f14&middot;5d3&middot;6s2')
    A.W = new Element('W', 'Tungsten', 74, false, '#2194D6', 2, 183.85, '[Xe]4f14&middot;5d4&middot;6s2')
    A.Re = new Element('Re', 'Rhenium', 75, false, '#267DAB', 3, 186.207, '[Xe]4f14&middot;5d5&middot;6s2')
    A.Os = new Element('Os', 'Osmium', 76, false, '#266696', 2, 190.2, '[Xe]4f14&middot;5d6&middot;6s2')
    A.Ir = new Element('Ir', 'Iridium', 77, false, '#175487', 3, 192.22, '[Xe]4f14&middot;5d7&middot;6s2')
    A.Pt = new Element('Pt', 'Platinum', 78, false, '#9595A0', 0, 195.09, '[Xe]4f14&middot;5d9&middot;6s1')
    A.Au = new Element('Au', 'Gold', 79, false, '#B9981A', 1, 196.9665, '[Xe]4f14&middot;5d10&middot;6s1')
    A.Hg = new Element('Hg', 'Mercury', 80, false, '#9595A9', 0, 200.59, '[Xe]4f14&middot;5d10&middot;6s2')
    A.Tl = new Element('Tl', 'Thallium', 81, false, '#A6544D', 0, 204.37, '[Xe]4f14&middot;5d10&middot;6s2&middot;6p1')
    A.Pb = new Element('Pb', 'Lead', 82, false, '#575961', 4, 207.2, '[Xe]4f14&middot;5d10&middot;6s2&middot;6p2')
    A.Bi = new Element('Bi', 'Bismuth', 83, false, '#9E4FB5', 3, 208.9804, '[Xe]4f14&middot;5d10&middot;6s2&middot;6p3')
    A.Po = new Element('Po', 'Polonium', 84, false, '#AB5C00', 2, 209, '[Xe]4f14&middot;5d10&middot;6s2&middot;6p4')
    A.At = new Element('At', 'Astatine', 85, true, '#754F45', 1, 210, '[Xe]4f14&middot;5d10&middot;6s2&middot;6p5')
    A.Rn = new Element('Rn', 'Radon', 86, false, '#428296', 0, 222, '[Xe]4f14&middot;5d10&middot;6s2&middot;6p6')
    A.Fr = new Element('Fr', 'Francium', 87, false, '#420066', 0, 223, '[Rn]7s1')
    A.Ra = new Element('Ra', 'Radium', 88, false, '#007D00', 0, 226.0254, '[Rn]7s2')
    A.Ac = new Element('Ac', 'Actinium', 89, false, '#669CE4', 0, 227.0278, '[Rn]6d1&middot;7s2')
    A.Th = new Element('Th', 'Thorium', 90, false, '#00B8FC', 0, 232.0381, '[Rn]6d2&middot;7s2')
    A.Pa = new Element('Pa', 'Protactinium', 91, false, '#00A1FF', 0, 231.0359, '[Rn]5f2&middot;6d1&middot;7s2')
    A.U = new Element('U', 'Uranium', 92, false, '#008FFF', 0, 238.029, '[Rn]5f3&middot;6d1&middot;7s2')
    A.Np = new Element('Np', 'Neptunium', 93, false, '#0080FF', 0, 237.0482, '[Rn]5f4&middot;6d1&middot;7s2')
    A.Pu = new Element('Pu', 'Plutonium', 94, false, '#006BFF', 0, 244, '[Rn]5f6&middot;7s2')
    A.Am = new Element('Am', 'Americium', 95, false, '#545CF2', 0, 243, '[Rn]5f7&middot;7s2')
    A.Cm = new Element('Cm', 'Curium', 96, false, '#785CE3', 0, 247, '[Rn]5f7&middot;6d1&middot;7s2')
    A.Bk = new Element('Bk', 'Berkelium', 97, false, '#8A4FE3', 0, 247, '[Rn]5f9&middot;7s2')
    A.Cf = new Element('Cf', 'Californium', 98, false, '#A136D4', 0, 251, '[Rn]5f10&middot;7s2')
    A.Es = new Element('Es', 'Einsteinium',99, false, '#B31FD4', 0, 252, '[Rn]5f11&middot;7s2')
    A.Fm = new Element('Fm', 'Fermium', 100, false, 'null', 0, 257, '[Rn]5f12&middot;7s2')
    A.Md = new Element('Md', 'Mendelevium', 101, false, 'null', 0, 258, '[Rn]5f13&middot;7s2')
    A.No = new Element('No', 'Nobelium', 102, false, 'null', 0, 259, '[Rn]5f14&middot;7s2')
    A.Lr = new Element('Lr', 'Lawrencium', 103, false, 'null', 0, 260, '[Rn]5f14&middot;6d1&middot;7s2')
    A.Rf = new Element('Rf', 'Rutherfordium', 104, false, '#42A8DC', 0, 261, '[Rn]5f14&middot;6d2&middot;7s2')
    A.Db = new Element('Db', 'Dubnium', 105, false, '#4BA2F9', 0, 262, '[Rn]5f14&middot;6d3&middot;7s2')
    A.Sg = new Element('Sg', 'Seaborgium', 106, false, '#2194D6', 0, 266, '[Rn]5f14&middot;6d4&middot;7s2')
    A.Bh = new Element('Bh', 'Bohrium', 107, false, '#267DAB', 0, 264, '[Rn]5f14&middot;6d5&middot;7s2')
    A.Hs = new Element('Hs', 'Hassium', 108, false, '#266696', 0, 277, '[Rn]5f14&middot;6d6&middot;7s2')
    A.Mt = new Element('Mt', 'Meitnerium', 109, false, '#175487', 0, 268, '[Rn]5f14&middot;6d7&middot;7s2')
    A.Ds = new Element('Ds', 'Darmstadtium', 110, false, '#9595A0', 0, 281, '[Rn]5f14&middot;6d9&middot;7s1')
    A.Rg = new Element('Rg', 'Roentgenium', 111, false, '#B9981A', 0, 272, '[Rn]5f14&middot;6d9&middot;7s2')
    A.Cn = new Element('Cn', 'Copernicium', 112, false, '#9595A9', 0, 285, '[Rn]5f14&middot;6d10&middot;7s2')
    A.Uut = new Element('Uut', 'Ununtrium', 113, false, '#000000', 0, 284, '[Rn]5f14&middot;6d10&middot;7s1')
    A.Uuq = new Element('Uuq', 'Ununquadium', 114, false, '#000000', 0, 289, '[Rn]5f14&middot;6d10&middot;7s2&middot;7p2')
    A.Uup = new Element('Uup', 'Ununpentium', 115, false, '#000000', 0, 288, '[Rn]5f14&middot;6d10&middot;7s2&middot;7p3')
    A.Uuh = new Element('Uuh', 'Ununhexium', 116, false, '#000000', 0, 292, '[Rn]5f14&middot;6d10&middot;7s2&middot;7p4')
    A.Uus = new Element('Uus', 'Ununseptium', 117, false, '#000000', 0, 291, '')
    A.Uuo = new Element('Uuo', 'Ununoctium', 118, false, '#000000', 0, 294, '')
    A.H.pyColor = "#E6E6E6"
    A.C.pyColor = "#33FF33"
    A.N.pyColor = "#3333FF"
    A.O.pyColor = "#FF4D4D"
    A.F.pyColor = "#B3FFFF"
    A.S.pyColor = "#E6C640"
    A

  class IO
    constructor: ->

    fit: (data, length, leftAlign) ->
      size = data.length
      padding = []
      i = 0
      l = length - size
      while i < l
        padding.push " "
        i++
      if leftAlign then data + padding.join("") else padding.join("") + data

  class Exporter extends IO

    constructor: (@sketcher) ->

    canvasToSvg: ->
      svg = @sketcher.project.exportSVG()
      XMLS = new XMLSerializer
      inp_xmls = XMLS.serializeToString svg
      #document.body.insertAdjacentHTML('afterbegin', inp_xmls);

      console.log svg
      setTimeout( =>
        @svgToCanvas svg,
        200)

    svgToCanvas: (svg) ->

      i = 0
      l = @sketcher.layers.length
      while i < l
        @sketcher.layers[i].remove()
        i++
      @sketcher.molLayer = new @sketcher.Layer()
      @sketcher.molLayer.activate()
      @sketcher.view.draw()

      molLayer = $($(svg).first().children()[0])
      $(molLayer.children()).each (i, mol) =>
        if $(mol).children().length
          molecule = new @sketcher.Group()
          molecule.bonds = []
          molecule.labels = []
          molecule.nodes = []
          $(mol).find("line, polygon").each (ii, bond) =>

            bondData = JSON.parse(bond.getAttribute("bData")) || undefined
            unless bondData is undefined

              p1 = new @sketcher.Point
                x: parseFloat bondData.a1.x
                y: parseFloat bondData.a1.y
              p2 = new @sketcher.Point
                x: parseFloat bondData.a2.x
                y: parseFloat bondData.a2.y

              hitResult1 = @sketcher.project.hitTest(p1, @sketcher.altHitOptions)
              hitResult2 = @sketcher.project.hitTest(p2, @sketcher.altHitOptions)

              dBond = new @sketcher.Path @sketcher.getBondOptions([p1, p2])
              dBond.dType = 'bond'
              dBond.n_a = new BondNode dBond.segments[0], dBond.segments[0].point, dBond
              dBond.n_b = new BondNode dBond.segments[1], dBond.segments[1].point, dBond
              dBond.molecule = molecule

              molecule.addChild dBond
              molecule.bonds.push dBond
              molecule.nodes.push dBond.n_a, dBond.n_b

              if hitResult1 and hitResult1.type = 'segment' and hitResult1.item.dType == "bond"
                @sketcher.connect hitResult1.item, dBond, hitResult1.segment.point
              if hitResult2 and hitResult2.item and hitResult2.item.dType == "bond"
                @sketcher.connect hitResult2.item, dBond, hitResult2.segment.point, "alt"

              if bondData.bO == 2 then @sketcher.mkDoubleBond("e", dBond)
              if bondData.bS == 1 then @sketcher.mkWedgedBond(dBond)
              else if bondData.bS == 6 then @sketcher.mkHashedBond(dBond)

          $(mol).find("text").each (ii, text) =>
            textData = JSON.parse(text.getAttribute("bData")) || undefined
            unless textData is undefined
              p = new @sketcher.Point
                x: parseFloat textData.p.x
                y: parseFloat textData.p.y
              hitResult = @sketcher.project.hitTest(p, @sketcher.altHitOptions)
              if hitResult and hitResult.type = 'segment'
                @sketcher.addUpdateLabel('e', hitResult, textData.c)

  class MOLInterpreter extends IO

    constructor: (@sketcher) ->
      @bonds = {}
      @atoms = {}
      @atom_count = 0
      @bond_count = 0
      @mol_lines = ""
      @bondLength = @sketcher.bondLength

    addAtom: (atom) ->
      @atoms[atom.id] = atom

    addBond: (bond) ->
      @bonds[bond.id] = bond

    read: (mol) ->
      @mol_lines = mol.split("\n")

      @atom_count = parseInt(@mol_lines[3].substr(0, 3))
      @bond_count = parseInt(@mol_lines[3].substr(3, 3))

      line = @mol_lines[4 + @atom_count]
      bond1 = {}
      bond1["a1"] = parseFloat(line.substr(0, 3))
      bond1["a2"] = parseFloat(line.substr(3, 3))

      line = @mol_lines[ 3 + bond1.a1 ]
      atom1 = {}
      atom1["x"] = parseFloat(line.substr(0, 10))
      atom1["y"] = parseFloat(line.substr(10, 10))

      line = @mol_lines[ 3 + bond1.a2 ]
      atom2 = {}
      atom2["x"] = parseFloat(line.substr(0, 10))
      atom2["y"] = parseFloat(line.substr(10, 10))

      p1 = new @sketcher.Point
        x: atom1.x
        y: atom1.y
      p2 = new @sketcher.Point
        x: atom2.x
        y: atom2.y

      length = p1.getDistance(p2)
      factor = @bondLength/length

      # atoms' lines
      i = 1
      while i <= @atom_count
        line = @mol_lines[i + 3]
        atom = {}
        atom["id"] = i
        atom["x"] = parseFloat(line.substr(0, 10))*factor
        atom["y"] = parseFloat(line.substr(10, 10))*-factor
        atom["z"] = parseFloat(line.substr(20, 10))*factor
        atom["label"] = line.substr(30, 4).replace(/(^\s*)|(\s*$)/g, "")
        atom["bonds"] = []
        @addAtom atom
        i++

      # bonds' lines
      i = 1
      while i <= @bond_count
        line = @mol_lines[i + 3 + @atom_count]
        bond = {}
        bond["id"] = line.substr(0, 6)
        bond["a1"] = @atoms[parseFloat(line.substr(0, 3))]
        bond["a2"] = @atoms[parseFloat(line.substr(3, 3))]
        bond["type"] = parseFloat(line.substr(6, 3))
        bond["stereo"] = parseInt(line.substr(9, 3))
        bond["drawn"] = false
        @addBond bond
        bond.a1.bonds.push bond
        bond.a2.bonds.push bond
        i++

      @drawMol()

    drawMol: ->
      if @sketcher.project.activeLayer != @sketcher.molLayer then @sketcher.molLayer.activate()

      molecule = new @sketcher.Group()
      molecule.bonds = []
      molecule.labels = []
      molecule.nodes = []
      draw = =>
        i = 1
        while i <= @atom_count
          atom = @atoms[i]
          j = 0
          l = atom.bonds.length
          while j < l
            iBond = atom.bonds[j]
            unless iBond.dBond
              point_a = new @sketcher.Point
                x: iBond.a1.x
                y: iBond.a1.y
              point_b = new @sketcher.Point
                x: iBond.a2.x
                y: iBond.a2.y
              bond = new @sketcher.Path @sketcher.getBondOptions([point_a, point_b])
              bond.n_a = new BondNode(bond.segments[0], bond.segments[0].point, bond)
              bond.n_b = new BondNode(bond.segments[1], bond.segments[1].point, bond)
              bond.bondOrder = if iBond.type < 2 then 1 else if iBond.type < 3 then 2 else if iBond.type == 3 then 3 else 1
              bond.dType = 'bond'
              bond.molecule = molecule
              molecule.addChild bond
              if bond.bondOrder == 2
                bond.bondOrder = 1
                @sketcher.mkDoubleBond 'e', bond
              else if bond.bondOrder == 3
                bond.bondOrder = 1
                @sketcher.mkTripleBond 'e', bond
              iBond.dBond = bond
              if bond.bondOrder == 1
                if iBond.stereo == 1
                  @sketcher.mkWedgedBond(bond)
                else if iBond.stereo == 6
                  @sketcher.mkHashedBond(bond)
                else bond.stereo = 'none'

            j++
          firstBond = atom.bonds[0].dBond
          point1 = new @sketcher.Point
            x: atom.x
            y: atom.y
          j = 1
          l = atom.bonds.length
          while j < l
            iBond = atom.bonds[j]
            bond = iBond.dBond
            if atom == iBond.a1
              @sketcher.connect firstBond, bond, point1
            else
              @sketcher.connect firstBond, bond, point1, "alt"
            j++
          unless atom.label == "C"
            hitResult = @sketcher.project.hitTest(point1, @sketcher.altHitOptions)
            unless hitResult is undefined
              @sketcher.addUpdateLabel("e", hitResult, atom.label)
          i++
      draw()
      molecule.position = @sketcher.view.center
      @sketcher.view.draw()


    write: (molecule) ->

      mol = []
      mol.push "MOL file exported from omgexams.com\nChemCanvas v0.9  http://www.omgexams.com\n[ Description ]\n"
      mol.push @fit(molecule.nodes.length.toString(), 3)
      mol.push @fit(molecule.bonds.length.toString(), 3)
      mol.push "  0  0  0  0  0  0  0  0999 V2000\n"
      pos = molecule.bounds.center
      i = 0
      l = molecule.nodes.length
      while i < l
        n = molecule.nodes[i]
        if n.labels and n.labels.atom and n.labels.atom.ele
          label = n.labels.atom.ele.symbol
        else label = 'C'
        if n.labels and n.labels.atom
          p = new @sketcher.Point
            x: n.labels.atom.point.x
            y: n.labels.atom.point.y - 3.5
        else p = n.point

        mol.push @fit(((p.x - pos.x) / @bondLength).toFixed(4), 10)
        mol.push @fit((-(p.y - pos.y) / @bondLength).toFixed(4), 10)
        mol.push @fit(0.toFixed(4), 10)
        mol.push " "
        mol.push @fit(label, 3, true)
        mol.push " 0  0  0  0  0  0  0  0  0  0  0  0\n"
        i++
      i = 0
      l = molecule.bonds.length
      while i < l
        b = molecule.bonds[i]
        stereo = 0
        if b.stereo == 'wedged'
          stereo = 1
        else stereo = 6 if b.stereo == 'hashed'
        indexes =
          a1: 0
          a2: 0
        ii = 0
        ll = molecule.nodes.length
        while ii < ll
          if molecule.nodes[ii].ref == b.n_a.ref then indexes.a1 = ii + 1
          if molecule.nodes[ii].ref == b.n_b.ref then indexes.a2 = ii + 1
          ii++
        bo = if b.bondOrder then b.bondOrder else 1
        mol.push @fit(indexes.a1.toString(), 3)
        mol.push @fit(indexes.a2.toString(), 3)
        mol.push @fit(bo.toString(), 3)
        mol.push "  "
        mol.push stereo
        mol.push "  0  0  0\n"
        i++
      mol.push "M  END"
      mol.join ""

  class BondNode
    constructor: (@segment, @point, bond) ->
      @connections = []
      @ref = "node_" + Math.floor(Math.random()*1000000)
      @parentBond = bond

  class _Action
    constructor: (@sketcher) ->

  class MouseUpAction extends _Action

    constructor: (sketcher, @e, @hitResult) ->
      super sketcher
      @state = @sketcher.stateManager.getCurrentState()

    redo: ->
      @state.mouseUp(@e, @hitResult)

    undo: ->

  class MoveMoleculeAction extends _Action

    constructor: (sketcher, @molecule, @initPoint, @toPoint) ->
      super sketcher

    redo: ->
      delta = new @sketcher.Point
        x: @toPoint.x - @initPoint.x
        y: @toPoint.y - @initPoint.y
      @molecule.translate(delta)

    undo: ->
      delta = new @sketcher.Point
        x: @initPoint.x - @toPoint.x
        y: @initPoint.y - @toPoint.y
      @molecule.translate(delta)

  class RotateMoleculeAction extends _Action

    constructor: (sketcher, @molecule, @initPoint, @lastPoint, @center) ->
      super sketcher

    redo: ->
      diff = @lastPoint.angle - @initPoint.angle
      @molecule.rotate diff, @center
      i = 0
      l = @molecule.children.length
      while i < l
        child = @molecule.children[i]
        if child.dType and child.dType is 'label'
          child.rotate -diff
        i++

    undo: ->
      diff = @initPoint.angle - @lastPoint.angle
      @molecule.rotate diff, @center
      i = 0
      l = @molecule.children.length
      while i < l
        child = @molecule.children[i]
        if child.dType and child.dType is 'label'
          child.rotate -diff
        i++

  class DeleteBondAction extends _Action

    constructor: (sketcher, @molecule, @bond, @molecules) ->
      super sketcher

    redo: ->
      if @bond.n_a then @sketcher.deleteFromNode(@bond, @bond.n_a)
      if @bond.n_b then @sketcher.deleteFromNode(@bond, @bond.n_b)
      @bond.remove()
      if @bond.bondOrder == 2 then @bond.multiple[0].remove()
      if @molecule.children.length
        molecules = @sketcher.checkMolecule @molecule
        if @molecules.length
          l = molecules.length - 1
          while l > -1
            if molecules[l] != @molecule
              @molecules[l].addChildren molecules[l].children
              molecules[l].remove()
              i = 0
              ll = @molecules[l].children.length
              while i < ll
                if @molecules[l].children[i] == @bond then @bond.remove()
                @molecules[l].children[i].molecule = @molecules[l]
                i++
            l--
        else @molecules = molecules

    undo: ->
      @molecule.addChild @bond
      if @bond.n_a and @bond.n_a.connections.length
        @sketcher.reconnect @bond.n_a.connections[0], @bond, @bond.n_a.point
      if @bond.n_b and @bond.n_b.connections.length
        @sketcher.reconnect @bond.n_b.connections[0], @bond, @bond.n_b.point, "alt"
      #@sketcher.checkMolecule(@molecule)

  class NewBondAction extends _Action

    constructor: (sketcher, @molecule, @bond) ->
      super sketcher
      @molecules = []
      @deleteAction = new DeleteBondAction sketcher, molecule, bond, @molecules

    redo: ->
      @deleteAction.undo()

    undo: ->
      @deleteAction.redo()

  class NewRingAction extends _Action

    constructor: (sketcher, @bonds) ->
      super sketcher
      @actions = []
      i = 0
      l = bonds.length
      while i < l
        molecules = []
        @actions.push new DeleteBondAction sketcher, bonds[i].molecule, bonds[i], molecules
        i++

    redo: ->
      i = 0
      l = @actions.length
      while i < l
        @actions[i].undo()
        i++

    undo: ->
      l = @actions.length - 1
      while l > -1
        @actions[l].redo()
        l--

  class NewAtomLabelAction extends _Action
    constructor: (sketcher, @node, @label) ->
      super sketcher

    redo: ->
      @sketcher.addLabelToNode @node, @label
      @sketcher.updateBonds @label.connections, @node.segment.point, @label.bounds.center

    undo: ->
      @sketcher.deleteLabel @label


  class HistoryManager
    constructor: (@sketcher) ->
      @undoStack = []
      @redoStack = []

    addAction: (action) ->
      @undoStack.push action
      @redoStack = []
      $(".toolbaricons-redo").parent().addClass "disable"
      $(".toolbaricons-undo").parent().removeClass "disable"

    doUndo: ->
      if @undoStack.length
        action = @undoStack[@undoStack.length - 1]
        action.undo()
        @sketcher.view.draw()
        @redoStack.push action
        @undoStack.splice(@undoStack.indexOf(action), 1)
        if @undoStack.length == 0
          $(".toolbaricons-undo").parent().addClass "disable"
        $(".toolbaricons-redo").parent().removeClass "disable"

    doRedo: ->
      if @redoStack.length
        action = @redoStack[@redoStack.length - 1]
        action.redo()
        @sketcher.view.draw()
        @undoStack.push action
        @redoStack.splice(@redoStack.indexOf(action), 1)
        if @redoStack.length == 0
          $(".toolbaricons-redo").parent().addClass "disable"
        $(".toolbaricons-undo").parent().removeClass "disable"

  class _State
    constructor: (@sketcher) ->

  class NewSingleBond extends _State
    constructor: (sketcher, @stereo) ->
      super sketcher
      @bondOrder = 1

    mouseUp: (e, hitResult) ->
      if hitResult and hitResult.type == 'stroke'
        bond = hitResult.item
        if bond.bondType and bond.bondType == "aux"
          bond = bond.mainBond
        if bond.bondOrder and bond.bondOrder isnt 1
          i = 0
          l = bond.multiple.length
          while i < l
            extra = bond.multiple[i]
            bond.multiple.splice(0, 1)
            extra.remove()
            bond.bondOrder = 1
            i++
        if @stereo == 'wedged'
          @sketcher.mkWedgedBond hitResult.item
        else if @stereo == 'hashed'
          @sketcher.mkHashedBond hitResult.item
        else @sketcher.doMouseUp e, hitResult
      else
        bond = @sketcher.doMouseUp e, hitResult
        if @stereo == 'wedged'
          @sketcher.mkWedgedBond bond
        else if @stereo == 'hashed'
          @sketcher.mkHashedBond bond

  class NewDoubleBond extends _State
    constructor: (sketcher) ->
      super sketcher

    mouseUp: (e, hitResult) ->
      if hitResult and hitResult.type == 'stroke'
        bond = @sketcher.mkDoubleBond(e, hitResult.item)
      else
        bond = @sketcher.doMouseUp e, hitResult
        doubleBond = @sketcher.mkDoubleBond e, bond

  class NewTripleBond extends _State
    constructor: ->

  class NewAtomLabel extends _State
    constructor: (sketcher) ->
      super sketcher
      @label = 'C'

    setLabel: (label) ->
      @label = label

    mouseUp: (e, hitResult) ->
      @sketcher.addUpdateLabel(e, hitResult, @label)

  class NewRing6 extends _State
    mouseUp: (e, hitResult) ->
      bonds = @sketcher.mkRing hitResult, 6
      @sketcher.historyManager.addAction new NewRingAction @sketcher, bonds
  class NewRing5 extends _State
    mouseUp: (e, hitResult) ->
      bonds = @sketcher.mkRing hitResult, 5
      @sketcher.historyManager.addAction new NewRingAction @sketcher, bonds
  class NewRing4 extends _State
    mouseUp: (e, hitResult) ->
      bonds = @sketcher.mkRing hitResult, 4
      @sketcher.historyManager.addAction new NewRingAction @sketcher, bonds
  class NewRing3 extends _State
    mouseUp: (e, hitResult) ->
      bonds = @sketcher.mkRing hitResult, 3
      @sketcher.historyManager.addAction new NewRingAction @sketcher, bonds
  class NewRing7 extends _State
    mouseUp: (e, hitResult) ->
      bonds = @sketcher.mkRing hitResult, 7
      @sketcher.historyManager.addAction new NewRingAction @sketcher, bonds
  class NewRing8 extends _State
    mouseUp: (e, hitResult) ->
      bonds = @sketcher.mkRing hitResult, 8
      @sketcher.historyManager.addAction new NewRingAction @sketcher, bonds
  class Delete extends _State
    mouseUp: (e, hitResult) ->
      @sketcher.iDelete()

  class StateManager
    constructor: (@sketcher) ->
      @NEW_SINGLE_BOND = new NewSingleBond sketcher, 'none'
      @NEW_DOUBLE_BOND = new NewDoubleBond sketcher
      @NEW_TRIPLE_BOND = new NewTripleBond sketcher
      @NEW_RING_6 = new NewRing6 sketcher
      @NEW_RING_5 = new NewRing5 sketcher
      @NEW_RING_4 = new NewRing4 sketcher
      @NEW_RING_3 = new NewRing3 sketcher
      @NEW_RING_7 = new NewRing7 sketcher
      @NEW_RING_8 = new NewRing8 sketcher
      @DELETE = new Delete sketcher
      @NEW_ATOM_LABEL = new NewAtomLabel sketcher
      @currentState = undefined

    setState: (state) ->
      @currentState = state

    getCurrentState: ->
      @currentState


  ((c, pencil, items, m, Ele, io) ->
    "use strict"

    c.Canvas = (canvas_id, width, height) ->

      Array::distinct = ->
        distinctArray = []
        i = 0
        while i < @length
          if distinctArray.indexOf(@[i]) == -1 then distinctArray.push(@[i])
          i++
        distinctArray

      @stateManager = new StateManager this
      @historyManager = new HistoryManager this
      @Ele = Ele
      @io = io

      canvas = $('#'+canvas_id)
      container = canvas.parent()
      container.addClass "chem-canvas-container"
      if width
        container.width width
      else
        container.width $('#content-container').width()
      container.height height
      canvas.addClass "chem-canvas"
      container.append "<div class='top-toolbar'></div><div class='left-toolbar'></div><div class='right-toolbar'></div>"
      canvas.width container.width() - 76
      canvas.height container.height() - 40
      left_menu = container.find('.left-toolbar')
      right_menu = container.find('.right-toolbar')
      top_menu = container.find('.top-toolbar')
      right_menu.append "<div class='btn-group right-menu' style='top: 2px;' data-toggle='buttons'>
        <label class='btn chem-btn' style='left: 2px; font-size: 24px; color: #808080; padding-top: 0; height: 36px'>
        <input type='radio' name='options'>H
        </label>
        <label class='btn chem-btn' style='margin-top: 1px; font-size: 24px; color: #F090A0; padding-top: 0'>
          <input type='radio' name='options'>B
        </label>
        <label class='btn chem-btn' style='font-size: 24px; color: #000000;; padding-top: 0'>
        <input type='radio' name='options'>C
        </label>
        <label class='btn chem-btn' style='font-size: 24px; color: #3050F8; padding-top: 0'>
        <input type='radio' name='options'>N
        </label>
        <label class='btn chem-btn' style='font-size: 24px; color: #FF0D0D; padding-top: 0px'>
        <input type='radio' name='options'>O
        </label>
        <label class='btn chem-btn' style='font-size: 24px; color: #B09276; padding-top: 0px; padding-left: 6px'>
        <input type='radio' name='options'>Si
        </label>
        </label>
        <label class='btn chem-btn' style='font-size: 24px; color: #FFC832; padding-top: 0px'>
        <input type='radio' name='options'>S
        </label>
        <label class='btn chem-btn' style='font-size: 24px; color: #FF8000; padding-top: 0px'>
        <input type='radio' name='options'>P
        </label>
        <label class='btn chem-btn' style='font-size: 24px; color: #228B22; padding-top: 0px'>
        <input type='radio' name='options'>F
        </label>
        <label class='btn chem-btn' style='font-size: 24px; color: #1DC51D; padding-top: 0px; padding-left: 5px'>
        <input type='radio' name='options'>Cl
        </label>
        <label class='btn chem-btn' style='font-size: 24px; color: #A62929; padding-top: 0px; padding-left: 5px'>
        <input type='radio' name='options'>Br
        </label>
        <label class='btn chem-btn' style='font-size: 24px; color: #940094; padding-top: 0px'>
        <input type='radio' name='options'>I
        </label>
      </div>
      <div class='btn-group right-menu style=''>
        <label class='btn chem-btn periodic_table_open' style='font-size: 24px; color: #008FFF; padding-top: 0px;'>
          <span class='glyphicon glyphicon-th' style='font-size: 20px; top: 1px'></span>
        </label>
      </div>"

      left_menu.append "<div class='btn-group' data-toggle='buttons'>
        <label class='btn chem-btn pencil' title='Universal Pen' style='left: 2px; top: 2px'>
          <input type='radio' name='options'>
          <a class='dropdown-toggle' data-toggle='dropdown'><span class='glyphicon glyphicon-pencil' style='top: 5px; font-size: 16px'></span><b class='custom-caret'></b></a>
          <ul class='dropdown-menu' style='z-index: 1100; overflow: visible; text-shadow: none;'>
                  <li><a href='#'>Action</a></li>
                  <li><a href='#'>Another action</a></li>
                  <li><a href='#'>Something else here</a></li>
                  <li class='divider'></li>
                  <li><a href='#'>Separated link</a></li>
                  <li><a href='#'>One more separated link</a></li>
                </ul>
        </label>
        <label class='btn chem-btn' title='Delete bond' style='margin-top: 4px'>
          <input type='radio' name='options'><span class='glyphicon glyphicon-remove' style='top: 4px'></span>
        </label>
        <label class='btn chem-btn' title='Single bond' style=''>
          <input type='radio' name='options'><span class='chemglyph chemglyph-single-bond'></span>
        </label>
        <label class='btn chem-btn' title='Double bond'>
          <input type='radio' name='options'><span class='chemglyph chemglyph-double-bond'></span>
        </label>
        <label class='btn chem-btn' title='Triple bond'>
          <input type='radio' name='options'><span class='chemglyph chemglyph-triple-bond'></span>
        </label>
        <label class='btn chem-btn' title='Hashed bond'>
          <input type='radio' name='options'><span class='chemglyph chemglyph-recessed-bond'></span>
        </label>
        <label class='btn chem-btn' title='Wedged bond'>
          <input type='radio' name='options'><span class='chemglyph chemglyph-protruding-bond'></span>
        </label>
        <label class='btn chem-btn' title='Cyclopropane'>
          <input type='radio' name='options'><span class='chemglyph chemglyph-ring-3'></span>
        </label>
        <label class='btn chem-btn' title='Cyclobutane'>
          <input type='radio' name='options'><span class='chemglyph chemglyph-ring-4'></span>
        </label>
        <label class='btn chem-btn' title='Cyclopentane'>
          <input type='radio' name='options'><span class='chemglyph chemglyph-ring-5'></span>
        </label>
        <label class='btn chem-btn' title='Cylohexane'>
          <input type='radio' name='options'><span class='chemglyph chemglyph-ring-6'></span>
        </label>
        <label class='btn chem-btn' title='Cycloheptane'>
          <input type='radio' name='options'><span class='chemglyph chemglyph-ring-7'></span>
        </label>
        <label class='btn chem-btn' title='Cyclooctane'>
          <input type='radio' name='options'><span class='chemglyph chemglyph-ring-8'></span>
        </label>
      </div>"

      top_menu.append "<div class='btn-group' style='left: 48px; top: 1px;'>
        <label class='btn chem-btn toolbar' title='Clear all' style=''>
          <span class='toolbaricons toolbaricons-new'></span>
        </label>
        <label class='btn chem-btn' title='Import' style=''>
          <input class='file hidden' id='fileInput' type='file' name='files'><span class='toolbaricons toolbaricons-import'></span>
        </label>
        <label class='btn chem-btn' title='Export' style=''>
          <span class='toolbaricons toolbaricons-export'></span>
        </label>
        <label class='btn chem-btn toolbar disable' title='Duplicate selection' style=''>
          <span class='toolbaricons toolbaricons-copy'></span>
        </label>
        <label class='btn chem-btn toolbar disable' title='Undo' style=''>
          <span class='toolbaricons toolbaricons-undo'></span>
        </label>
        <label class='btn chem-btn toolbar disable' title='Redo' style=''>
          <span class='toolbaricons toolbaricons-redo'></span>
        </label>
        <label class='btn chem-btn toolbar' title='Zoom in' style=''>
          <span class='glyphicon glyphicon-zoom-in' style='font-size: 20px; left: -1px'></span>
        </label>
        <label class='btn chem-btn toolbar' title='Zoom out' style=''>
          <span class='glyphicon glyphicon-zoom-out' style='font-size: 20px; left: -1px'></span>
        </label>
        <label class='btn chem-btn toolbar' title='Print' style=''>
          <span class='toolbaricons toolbaricons-print'></span>
        </label>
        <label class='btn chem-btn toolbar' title='Exit' style=''>
          <span class='toolbaricons toolbaricons-exit'></span>
        </label>
      </div>"

      $("body").before("
        <div id='periodic_table' style='display: none; background-color: #DDDDDD'>
        <div style='text-align: center'>
        <label class='btn btn-default periodic_table_close' style='margin: 5px;' aria-hidden='true'>Close</label>
        </div>
        </div>")

      $("#periodic_table").prepend("
        <?xml version='1.0' encoding='utf-8'?>
        <svg version='1.1' id='mendeley' xmlns='http://www.w3.org/2000/svg' x='0px' y='0px'
        width='713.667px' height='368.352px' viewBox='0 0 713.667 368.352' enable-background='new 0 0 713.667 368.352'
        xml:space='preserve' style='display: block'>
          <g>
          <rect x='103' y='23' fill='#D8D8D8' stroke='#E8E8E8' stroke-width='2px' width='348.412' height='76.412'/>
          <text transform='matrix(1 0 0 1 107.6948 42)' fill='#2194D6' font-family='Helvetica' font-size='18'>Hydrogen</text>
          <text transform='matrix(1 0 0 1 107.6948 65)' font-family='Helvetica' font-size='14'>1s1</text>
          <text transform='matrix(1 0 0 1 445 42)' font-family='Helvetica' font-size='16' text-anchor='end'>1</text>
          <text transform='matrix(1 0 0 1 445 92)' font-family='Helvetica' font-size='22' text-anchor='end'>1.0079</text>
          </g><g>
          <rect x='3' y='3' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 11.6948 31)' fill='#808080' font-family='Helvetica' font-size='24'>H</text>
          </g><g>
          <rect x='673.588' y='3' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 676.2988 31)' fill='#849B9B' font-family='Helvetica' font-size='24'>He</text>
          </g><g>
          <rect x='3' y='42.446' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 11.0493 70)' fill='#C87EFA' font-family='Helvetica' font-size='24'>Li</text>
          </g><g>
          <rect x='42.446' y='42.446' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 45.9336 70)' fill='#82AB00' font-family='Helvetica' font-size='24'>Be</text>
          </g><g>
          <rect x='476.356' y='42.446' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 486.3301 70)' fill='#F090A0' font-family='Helvetica' font-size='24'>B</text>
          </g><g>
          <rect x='515.803' y='42.446' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 524.6953 70)' font-family='Helvetica' font-size='24'>C</text>
          </g><g>
          <rect x='555.249' y='42.446' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 564.6953 70)' fill='#304FF7' font-family='Helvetica' font-size='24'>N</text>
          </g><g>
          <rect x='594.695' y='42.446' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 604.0547 70)' fill='#FF0D0D' font-family='Helvetica' font-size='24'>O</text>
          </g><g>
          <rect x='634.142' y='42.446' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 644.9756 70)' fill='#228B22' font-family='Helvetica' font-size='24'>F</text>
          </g><g>
          <rect x='673.588' y='42.446' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 676.2988 70)' fill='#7B9CA8' font-family='Helvetica' font-size='24'>Ne</text>
          </g><g>
          <rect x='3' y='81.893' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 6.2993 109)' fill='#AB5CF2' font-family='Helvetica' font-size='24'>Na</text>
          </g><g>
          <rect x='42.446' y='81.893' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 44.0244 109)' fill='#61B400' font-family='Helvetica' font-size='24'>Mg</text>
          </g><g>
          <rect x='476.356' y='81.893' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 483.7744 109)' fill='#A79191' font-family='Helvetica' font-size='24'>Al</text>
          </g><g>
          <rect x='515.803' y='81.893' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 521.7744 109)' fill='#B09276' font-family='Helvetica' font-size='24'>Si</text>
          </g><g>
          <rect x='555.249' y='81.893' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 565.3301 109)' fill='#FF8000' font-family='Helvetica' font-size='24'>P</text>
          </g><g>
          <rect x='594.695' y='81.893' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 605.3301 109)' fill='#FFC832' font-family='Helvetica' font-size='24'>S</text>
          </g><g>
          <rect x='634.142' y='81.893' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 640.1406 109)' fill='#1DC51D' font-family='Helvetica' font-size='24'>Cl</text>
          </g><g>
          <rect x='673.588' y='81.893' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 679.5 109)' fill='#63A2B0' font-family='Helvetica' font-size='24'>Ar</text>
          </g><g>
          <rect x='3' y='121.339' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 12.3296 149)' fill='#8F40D4' font-family='Helvetica' font-size='24'>K</text>
          </g><g>
          <rect x='42.446' y='121.339' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 45.2993 149)' fill='#2FC300' font-family='Helvetica' font-size='24'>Ca</text>
          </g><g>
          <rect x='81.893' y='121.339' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 85.5796 149)' fill='#969696' font-family='Helvetica' font-size='24'>Sc</text>
          </g><g>
          <rect x='121.339' y='121.339' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 128.8472 149)' fill='#94969A' font-family='Helvetica' font-size='24'>Ti</text>
          </g><g>
          <rect x='160.786' y='121.339' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 171.3296 149)' fill='#96969A' font-family='Helvetica' font-size='24'>V</text>
          </g><g>
          <rect x='200.232' y='121.339' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 205.8652 149)' fill='#8796C3' font-family='Helvetica' font-size='24'>Cr</text>
          </g><g>
          <rect x='239.678' y='121.339' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 241.0244 149)' fill='#9C7AC7' font-family='Helvetica' font-size='24'>Mn</text>
          </g><g>
          <rect x='279.125' y='121.339' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 283.5796 149)' fill='#E06633' font-family='Helvetica' font-size='24'>Fe</text>
          </g><g>
          <rect x='318.571' y='121.339' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 321.2993 149)' fill='#DB8293' font-family='Helvetica' font-size='24'>Co</text>
          </g><g>
          <rect x='358.018' y='121.339' fill='#D8D8D8' stroke='#E8E8E8' width='36.411' height='36.412'/>
          <text transform='matrix(1 0 0 1 364.1406 149)' fill='#45B645' font-family='Helvetica' font-size='24'>Ni</text>
          </g><g>
          <rect x='397.464' y='121.339' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 400.2988 149)' fill='#C78033' font-family='Helvetica' font-size='24'>Cu</text>
          </g><g>
          <rect x='436.91' y='121.339' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 441.5801 149)' fill='#7D80B0' font-family='Helvetica' font-size='24'>Zn</text>
          </g><g>
          <rect x='476.356' y='121.339' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 479.6592 149)' fill='#BD8C8C' font-family='Helvetica' font-size='24'>Ga</text>
          </g><g>
          <rect x='515.803' y='121.339' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 518.6592 149)' fill='#668F8F' font-family='Helvetica' font-size='24'>Ge</text>
          </g><g>
          <rect x='555.249' y='121.339' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 559.5801 149)' fill='#BD80E3' font-family='Helvetica' font-size='24'>As</text>
          </g><g>
          <rect x='594.695' y='121.339' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 598.9336 149)' fill='#E28F00' font-family='Helvetica' font-size='24'>Se</text>
          </g><g>
          <rect x='634.142' y='121.339' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 639.5 149)' fill='#A62929' font-family='Helvetica' font-size='24'>Br</text>
          </g><g>
          <rect x='673.588' y='121.339' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 678.5 149)' fill='#53A6BC' font-family='Helvetica' font-size='24'>Kr</text>
          </g><g>
          <rect x='3' y='160.786' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 6.2993 188)' fill='#702EB0' font-family='Helvetica' font-size='24'>Rb</text>
          </g><g>
          <rect x='42.446' y='160.786' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 48.5 188)' fill='#00D000' font-family='Helvetica' font-size='24'>Sr</text>
          </g><g>
          <rect x='81.893' y='160.786' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 91.3296 188)' fill='#5FA4A4' font-family='Helvetica' font-size='24'>Y</text>
          </g><g>
          <rect x='121.339' y='160.786' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 128.1455 188)' fill='#6BA2A2' font-family='Helvetica' font-size='24'>Zr</text>
          </g><g>
          <rect x='160.786' y='160.786' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 163.2993 188)' fill='#61A4A9' font-family='Helvetica' font-size='24'>Nb</text>
          </g><g>
          <rect x='200.232' y='160.786' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 202.0244 188)' fill='#4EA9A9' font-family='Helvetica' font-size='24'>Mo
          </g><g>
          <rect x='239.678' y='160.786' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 244.5 188)' fill='#3B9E9E' font-family='Helvetica' font-size='24'>Tc</text>
          </g><g>
          <rect x='279.125' y='160.786' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 281.2993 188)' fill='#248F8F' font-family='Helvetica' font-size='24'>Ru</text>
          </g><g>
          <rect x='318.571' y='160.786' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 321.2993 188)' fill='#0A7D8C' font-family='Helvetica' font-size='24'>Rh</text>
          </g><g>
          <rect x='358.018' y='160.786' fill='#D8D8D8' stroke='#E8E8E8' width='36.411' height='36.412'/>
          <text transform='matrix(1 0 0 1 360.9336 188)' fill='#006985' font-family='Helvetica' font-size='24'>Pd</text>
          </g><g>
          <rect x='397.464' y='160.786' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 400.9336 188)' fill='#969696' font-family='Helvetica' font-size='24'>Ag</text>
          </g><g>
          <rect x='436.91' y='160.786' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 439.2988 188)' fill='#AE9462' font-family='Helvetica' font-size='24'>Cd</text>
          </g><g>
          <rect x='476.356' y='160.786' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 484.4092 188)' fill='#A67573' font-family='Helvetica' font-size='24'>In</text>
          </g><g>
          <rect x='515.803' y='160.786' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 518.9336 188)' fill='#668080' font-family='Helvetica' font-size='24'>Sn</text>
          </g><g>
          <rect x='555.249' y='160.786' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 557.9336 188)' fill='#9E63B5' font-family='Helvetica' font-size='24'>Sb</text>
          </g><g>
          <rect x='594.695' y='160.786' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 599.8545 188)' fill='#D47A00' font-family='Helvetica' font-size='24'>Te</text>
          </g><g>
          <rect x='634.142' y='160.786' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 647.8047 188)' fill='#940094' font-family='Helvetica' font-size='24'>I</text>
          </g><g>
          <rect x='673.588' y='160.786' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 676.9336 188)' fill='#429EB0' font-family='Helvetica' font-size='24'>Xe</text>
          </g><g>
          <rect x='3' y='200.231' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 6.9448 228)' fill='#57178F' font-family='Helvetica' font-size='24'>Cs</text>
          </g><g>
          <rect x='42.446' y='200.231' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 45.9336 228)' fill='#00C900' font-family='Helvetica' font-size='24'>Ba</text>
          </g><g>
          <rect x='81.893' y='200.231' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 86.2085 228)' fill='#57A4C5' font-family='Helvetica' font-size='24'>La</text>
          </g><g>
          <rect x='121.339' y='200.231' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 127.5 228)' fill='#42A8DC' font-family='Helvetica' font-size='24'>Hf</text>
          </g><g>
          <rect x='160.786' y='200.231' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 165.8545 228)' fill='#4BA2F9' font-family='Helvetica' font-size='24'>Ta</text>
          </g><g>
          <rect x='200.232' y='200.231' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 207.1455 228)' fill='#2194D6' font-family='Helvetica' font-size='24'>W</text>
          </g><g>
          <rect x='239.678' y='200.231' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 243.2993 228)' fill='#267DAB' font-family='Helvetica' font-size='24'>Re</text>
          </g><g>
          <rect x='279.125' y='200.231' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 282.3047 228)' fill='#266696' font-family='Helvetica' font-size='24'>Os</text>
          </g><g>
          <rect x='318.571' y='200.231' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 328.9756 228)' fill='#175487' font-family='Helvetica' font-size='24'>Ir</text>
          </g><g>
          <rect x='358.018' y='200.231' fill='#D8D8D8' stroke='#E8E8E8' width='36.411' height='36.412'/>
          <text transform='matrix(1 0 0 1 364.1348 228)' fill='#9595A0' font-family='Helvetica' font-size='24'>Pt</text>
          </g><g>
          <rect x='397.464' y='200.231' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 400.9336 228)' fill='#B9981A' font-family='Helvetica' font-size='24'>Au</text>
          </g><g>
          <rect x='436.91' y='200.231' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 440.2988 228)' fill='#9595A9' font-family='Helvetica' font-size='24'>Hg</text>
          </g><g>
          <rect x='476.356' y='200.231' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 483.4199 228)' fill='#A6544D' font-family='Helvetica' font-size='24'>Tl</text>
          </g><g>
          <rect x='515.803' y='200.231' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 518.9336 228)' fill='#575961' font-family='Helvetica' font-size='24'>Pb</text>
          </g><g>
          <rect x='555.249' y='200.231' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 561.7744 228)' fill='#9E4FB5' font-family='Helvetica' font-size='24'>Bi</text>
          </g><g>
          <rect x='594.695' y='200.231' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 597.9336 228)' fill='#AB5C00' font-family='Helvetica' font-size='24'>Po</text>
          </g><g>
          <rect x='634.142' y='200.231' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 639.1348 228)' fill='#754F45' font-family='Helvetica' font-size='24'>At</text>
          </g><g>
          <rect x='673.588' y='200.231' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 676.2988 228)' fill='#428296' font-family='Helvetica' font-size='24'>Rn</text>
          </g><g>
          <rect x='81.893' y='289.124' fill='#DDDDDD' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 84.2993 316)' fill='#989877' font-family='Helvetica' font-size='24'>Ce</text>
          </g><g>
          <rect x='120.893' y='289.124' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 126.5 317)' fill='#869D7B' font-family='Helvetica' font-size='24'>Pr</text>
          </g><g>
          <rect x='160.893' y='289.124' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 164.2993 317)' fill='#7DA07D' font-family='Helvetica' font-size='24'>Nd</text>
          </g><g>
          <rect x='199.893' y='289.124' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 200.75 317)' fill='#69A581' font-family='Helvetica' font-size='23'>Pm</text>
          </g><g>
          <rect x='239.125' y='289.124' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 239.75 317)' fill='#5EA883' font-family='Helvetica' font-size='23'>Sm</text>
          </g><g>
          <rect x='278.893' y='289.124' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 281.9336 317)' fill='#43B089' font-family='Helvetica' font-size='24'>Eu</text>
          </g><g>
          <rect x='318.893' y='289.124' fill='#D8D8D8' stroke='#E8E8E8' width='36.411' height='36.412'/>
          <text transform='matrix(1 0 0 1 320.6592 317)' fill='#31B48D' font-family='Helvetica' font-size='24'>Gd</text>
          </g><g>
          <rect x='357.464' y='289.124' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 361.5801 317)' fill='#23B890' font-family='Helvetica' font-size='24'>Tb</text>
          </g><g>
          <rect x='396.91' y='289.124' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 399.9453 317)' fill='#17BB92' font-family='Helvetica' font-size='24'>Dy</text>
          </g><g>
          <rect x='436.893' y='289.124' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 439.2988 317)' fill='#00C578' font-family='Helvetica' font-size='24'>Ho</text>
          </g><g>
          <rect x='475.803' y='289.124' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 481.5 317)' fill='#00C765' font-family='Helvetica' font-size='24'>Er</text>
          </g><g>
          <rect x='515.893' y='289.124' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 517.3955 317)' fill='#00C94E' font-family='Helvetica' font-size='24'>Tm</text>
          </g><g>
          <rect x='554.695' y='289.124' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 557.9336 317)' fill='#00BF38' font-family='Helvetica' font-size='24'>Yb</text>
          </g><g>
          <rect x='594.142' y='289.124' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 599.209 316)' fill='#00AB24' font-family='Helvetica' font-size='24'>Lu</text>
          </g><g>
          <rect x='3' y='239.678' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 10.1455 267)' fill='#420066' font-family='Helvetica' font-size='24'>Fr</text>
          </g><g>
          <rect x='42.446' y='239.678' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 45.2993 267)' fill='#007D00' font-family='Helvetica' font-size='24'>Ra</text>
          </g><g>
          <rect x='81.893' y='239.678' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 85.5796 267)' fill='#669CE4' font-family='Helvetica' font-size='24'>Ac</text>
          </g><g>
          <rect x='121.339' y='239.678' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 126.5 267)' fill='#42A8DC' font-family='Helvetica' font-size='24'>Rf</text>
          </g><g>
          <rect x='160.786' y='239.678' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 163.2993 267)' fill='#4BA2F9' font-family='Helvetica' font-size='24'>Db</text>
          </g><g>
          <rect x='200.232' y='239.678' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 202.9336 267)' fill='#2194D6' font-family='Helvetica' font-size='24'>Sg</text>
          </g><g>
          <rect x='239.678' y='239.678' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 241.9336 267)' fill='#267DAB' font-family='Helvetica' font-size='24'>Bh</text>
          </g><g>
          <rect x='279.125' y='239.678' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 282.9453 267)' fill='#266696' font-family='Helvetica' font-size='24'>Hs</text>
          </g><g>
          <rect x='318.571' y='239.678' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 323.2256 267)' fill='#175487' font-family='Helvetica' font-size='24'>Mt</text>
          </g><g>
          <rect x='358.018' y='239.678' fill='#D8D8D8' stroke='#E8E8E8' width='36.411' height='36.412'/>
          <text transform='matrix(1 0 0 1 361.9453 267)' fill='#9595A0' font-family='Helvetica' font-size='24'>Ds</text>
          </g><g>
          <rect x='397.464' y='239.678' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 400.2988 267)' fill='#B9981A' font-family='Helvetica' font-size='24'>Rg</text>
          </g><g>
          <rect x='436.91' y='239.678' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 440.2988 267)' fill='#9595A9' font-family='Helvetica' font-size='24'>Cn</text>
          </g><g>
          <rect x='476.91' y='238.678' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 479.2988 264)' fill='#000000' font-family='Helvetica' font-size='18'>Uut</text>
          </g><g>
          <rect x='516.91' y='238.678' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 519.2988 264)' fill='#000000' font-family='Helvetica' font-size='18'>Uuq</text>
          </g><g>
          <rect x='555.91' y='238.678' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 558.2988 264)' fill='#000000' font-family='Helvetica' font-size='18'>Uup</text>
          </g><g>
          <rect x='594.91' y='238.678' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 597.2988 264)' fill='#000000' font-family='Helvetica' font-size='18'>Uuh</text>
          </g><g>
          <rect x='633.91' y='238.678' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 636.2988 264)' fill='#000000' font-family='Helvetica' font-size='18'>Uus</text>
          </g><g>
          <rect x='672.91' y='238.678' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>
          <text transform='matrix(1 0 0 1 675.2988 264)' fill='#000000' font-family='Helvetica' font-size='18'>Uuo</text>
          </g><g>
          <rect x='81.893' y='328.571' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.411'/>
          <text transform='matrix(1 0 0 1 86.5796 356)' fill='#00B8FC' font-family='Helvetica' font-size='24'>Th</text>
          </g><g>
          <rect x='120.786' y='328.571' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.411'/>
          <text transform='matrix(1 0 0 1 123.9336 356)' fill='#00A1FF' font-family='Helvetica' font-size='24'>Pa</text>
          </g><g>
          <rect x='160.893' y='328.571' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.411'/>
          <text transform='matrix(1 0 0 1 170.6953 356)' fill='#008FFF' font-family='Helvetica' font-size='24'>U</text>
          </g><g>
          <rect x='199.678' y='328.571' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.411'/>
          <text transform='matrix(1 0 0 1 202.2993 355)' fill='#0080FF' font-family='Helvetica' font-size='24'>Np</text>
          </g><g>
          <rect x='239.125' y='328.571' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.411'/>
          <text transform='matrix(1 0 0 1 241.9336 355)' fill='#006BFF' font-family='Helvetica' font-size='24'>Pu</text>
          </g><g>
          <rect x='278.571' y='328.571' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.411'/>
          <text transform='matrix(1 0 0 1 280.75 355)' fill='#545CF2' font-family='Helvetica' font-size='22'>Am</text>
          </g><g>
          <rect x='318.018' y='328.571' fill='#D8D8D8' stroke='#E8E8E8' width='36.411' height='36.411'/>
          <text transform='matrix(1 0 0 1 319.1152 355)' fill='#785CE3' font-family='Helvetica' font-size='22'>Cm</text>
          </g><g>
          <rect x='357.464' y='328.571' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.411'/>
          <text transform='matrix(1 0 0 1 362.5801 355)' fill='#8A4FE3' font-family='Helvetica' font-size='24'>Bk</text>
          </g><g>
          <rect x='396.91' y='328.571' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.411'/>
          <text transform='matrix(1 0 0 1 402.5 355)' fill='#A136D4' font-family='Helvetica' font-size='24'>Cf</text>
          </g><g>
          <rect x='436.356' y='328.571' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.411'/>
          <text transform='matrix(1 0 0 1 439.5801 355)' fill='#B31FD4' font-family='Helvetica' font-size='24'>Es</text>
          </g><g>
          <rect x='475.803' y='328.571' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.411'/>
          <text transform='matrix(1 0 0 1 476.3955 355)' font-family='Helvetica' font-size='24'>Fm</text>
          </g><g>
          <rect x='515.249' y='328.571' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.411'/>
          <text transform='matrix(1 0 0 1 517.0244 355)' font-family='Helvetica' font-size='24'>Md</text>
          </g><g>
          <rect x='554.695' y='328.571' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.411'/>
          <text transform='matrix(1 0 0 1 557.2988 355)' font-family='Helvetica' font-size='24'>No</text>
          </g><g>
          <rect x='594.142' y='328.571' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.411'/>
          <text transform='matrix(1 0 0 1 599.7744 355)' font-family='Helvetica' font-size='24'>Lr</text>
          </g>
        </svg>")

      $("#periodic_table").popup
        pagecontainer: '.container'
        outline: true
        opacity: 0.4
        transition: 'all 0.3s'
        onclose: =>
          if @activeEle is undefined
            $('.periodic_table_open').removeClass "active"

      @customLabel = ->
        $('.periodic_table_open').children().first().remove()
        label = @activeEle.children().get(1).textContent.replace(/(^\s+|\s+$)/g, '')
        $('.periodic_table_open').text label
        if label.length == 2 then $('.periodic_table_open').css "padding-left", "3px"
        labelColor = @activeEle.children().get(1).getAttribute('fill')
        labelColor = "#000000" unless labelColor
        $('.periodic_table_open').css 'color', labelColor
        if @stateManager.getCurrentState() isnt @stateManager.NEW_ATOM_LABEL
          @stateManager.setState(@stateManager.NEW_ATOM_LABEL)
        @stateManager.getCurrentState().setLabel label

      left_menu = $('.left-toolbar')
      right_menu = $('.right-toolbar')
      top_menu = $('.top-toolbar')
      $(".pencil").addClass "active"
      $(".chemglyph-single-bond").parent().bind 'click', =>
        @stateManager.setState(@stateManager.NEW_SINGLE_BOND)
        @stateManager.NEW_SINGLE_BOND.stereo = 'none'
      $(".chemglyph-ring-6").parent().bind 'click', =>
        @stateManager.setState(@stateManager.NEW_RING_6)
      $(".chemglyph-ring-5").parent().bind 'click', =>
        @stateManager.setState(@stateManager.NEW_RING_5)
      $(".chemglyph-ring-4").parent().bind 'click', =>
        @stateManager.setState(@stateManager.NEW_RING_4)
      $(".chemglyph-ring-3").parent().bind 'click', =>
        @stateManager.setState(@stateManager.NEW_RING_3)
      $(".chemglyph-ring-7").parent().bind 'click', =>
        @stateManager.setState(@stateManager.NEW_RING_7)
      $(".chemglyph-ring-8").parent().bind 'click', =>
        @stateManager.setState(@stateManager.NEW_RING_8)
      $(".glyphicon-pencil").parent().bind 'click', =>
        @stateManager.setState(undefined)
      $(".glyphicon-remove").parent().bind 'click', =>
        @stateManager.setState(@stateManager.DELETE)
      $(".toolbaricons-print").parent().bind 'click', =>
        @printDoc()
      $(".toolbaricons-new").parent().bind 'click', =>
        l = @layers.length - 1
        while l > -1
          layer = @layers[l]
          layer.remove()
          l--
        @molLayer = new @Layer()
        @molLayer.activate()
        @view.zoom = 1
        @view.draw()
        @historyManager.undoStack = []
        @historyManager.redoStack = []

      right_menu.children().first().children().each (i, btn) =>
        that = this
        $(btn).bind "click", =>
          activeEl = left_menu.children().first().children().filter ->
            if $(this).hasClass "active" then this
          if activeEl then activeEl.removeClass "active"
          that.restoreTableIcon()
      left_menu.children().first().children().each (i, btn) =>
        that = this
        $(btn).bind "click", =>
          activeEl = right_menu.children().first().children().filter ->
            if $(this).hasClass "active" then this
          if activeEl then activeEl.removeClass "active"
          that.restoreTableIcon()
      $(".toolbaricons-undo").parent().bind 'click', =>
        if $(".toolbaricons-undo").parent().hasClass "disable" then return
        @historyManager.doUndo()
      $(".toolbaricons-redo").parent().bind 'click', =>
        if $(".toolbaricons-redo").parent().hasClass "disable" then return
        @historyManager.doRedo()
      $(".chemglyph-protruding-bond").parent().bind 'click', =>
        @stateManager.setState(@stateManager.NEW_SINGLE_BOND)
        @stateManager.NEW_SINGLE_BOND.stereo = 'wedged'
      $(".chemglyph-recessed-bond").parent().bind 'click', =>
        @stateManager.setState(@stateManager.NEW_SINGLE_BOND)
        @stateManager.NEW_SINGLE_BOND.stereo = 'hashed'
      $(".chemglyph-double-bond").parent().bind 'click', =>
        @stateManager.setState(@stateManager.NEW_DOUBLE_BOND)
      $(".toolbaricons-export").parent().bind 'click', =>
        if @molLayer.children.length
          molInter = new MOLInterpreter this
          mol = molInter.write @molLayer.children[0]
          console.log mol
          molInter.read mol

      $(".glyphicon-zoom-in").parent().bind 'click', =>
        if @view.zoom < 5
          @view.zoom += 0.5

      $(".glyphicon-zoom-out").parent().bind 'click', =>
        if @view.zoom > 1
          @view.zoom -= 0.5
      molInput = $("#fileInput")
      molInput.bind "click", ->
        molInput.val(null)
      molInput.on "change", (e) =>
        file = molInput[0].files[0]
        textType = /mol.*/
        if file.type.match(textType)
          reader = new FileReader()
          molInter = new MOLInterpreter this
          reader.onload = (e) ->
            molInter.read reader.result
          reader.readAsText file
        else
          console.log "File not supported!"

      $(".right-menu").children().each (i, btn) =>
        that = this
        if i < 12
          $(btn).bind 'click', =>
            if that.stateManager.getCurrentState() isnt that.stateManager.NEW_ATOM_LABEL
              that.stateManager.setState(that.stateManager.NEW_ATOM_LABEL)
            that.stateManager.getCurrentState().setLabel $(btn).text()
      periodic_table = $("#mendeley").children()
      @activeEle = undefined
      periodic_table.each (i, ele) =>
        if i > 0
          $(ele).attr 'cursor', 'pointer'
          $(ele).bind "mouseenter", =>
            $(ele).children().first().attr "stroke", "#008FFF"
            name = Ele[$(ele).children().get(1).textContent.replace(/(^\s+|\s+$)/g, '')].name unless Ele[$(ele).children().get(1).textContent.replace(/(^\s+|\s+$)/g, '')] == undefined
            color = $(ele).children().get(1).getAttribute "fill"
            @tableDisplay.children().get(1).setAttribute "fill", color
            if name
              symbol = Ele[$(ele).children().get(1).textContent.replace(/(^\s+|\s+$)/g, '')].symbol
              conf = Ele[symbol].electronicConf.split "&middot;"
              conf = conf.join(' ')
              if conf.indexOf "]" != -1 then conf = conf.replace("]", "] ")
              @tableDisplay.children().get(1).textContent = Ele[symbol].name
              @tableDisplay.children().get(3).textContent = Ele[symbol].atomicNumber
              if (Ele[symbol].atomicMass * 2) % 2 != 0
                @tableDisplay.children().get(4).textContent = Number(Ele[symbol].atomicMass).toFixed(3).toString()
              else @tableDisplay.children().get(4).textContent = Ele[symbol].atomicMass
              if conf then @tableDisplay.children().get(2).textContent = conf else  @tableDisplay.children().get(2).textContent = ""
            else
              @tableDisplay.children().get(1).textContent = Ele[$(ele).children().get(1).textContent.replace(/(^\s+|\s+$)/g, '')].name
              @tableDisplay.children().get(2).textContent = ""

          $(ele).bind "mouseleave", =>
            if $(ele).children().first().attr("fill") isnt "#FFFFFF"
              $(ele).children().first().attr "stroke", '#E8E8E8'
          $(ele).bind "click", =>
            if @activeEle and @activeEle.children().first().attr("fill") is "#FFFFFF"
              @activeEle.children().first().attr "stroke", "#E8E8E8"
              @activeEle.children().first().attr "fill", "#D8D8D8"
            $(ele).children().first().attr "fill", "#FFFFFF"
            $(ele).children().first().attr "stroke", "#008FFF"
            @activeEle = $(ele)
            @customLabel()
            activeEl = left_menu.children().first().children().filter ->
              if $(this).hasClass "active" then this
            if activeEl then activeEl.removeClass "active"
            activeEl = undefined
            activeEl = right_menu.children().first().children().filter ->
              if $(this).hasClass "active" then this
            if activeEl then activeEl.removeClass "active"
        else
          @tableDisplay = $(ele)

      $('.periodic_table_open').bind "click", ->
        $(this).addClass "active"

      @restoreTableIcon = =>
        if $('.periodic_table_open').hasClass "active"
          $('.periodic_table_open').removeClass "active"
          $('.periodic_table_open').text ""
          $('.periodic_table_open').css "color", "#008FFF"
          $('.periodic_table_open').append "<span class='glyphicon glyphicon-th' style='font-size: 20px; top: 1px'></span>"
          $('.periodic_table_open').css "padding-left", "8px"
        if @activeEle
          @activeEle.children().first().attr "stroke", "#E8E8E8"
          @activeEle.children().first().attr "fill", "#D8D8D8"
          @activeEle = undefined

      $( window ).resize =>
        if container.width() isnt $('#content-container').width()
          container.width $('#content-container').width()
          canvas.width container.width() - 76
          canvas.height container.height() - 40
          @view.viewSize = new @Size(canvas.width(), canvas.height())

      @setup(document.getElementById(canvas_id))

      @printDoc = ->
        svg = @project.exportSVG()
        printContent = "
        <html>
        <body>
        </body>
        </html>"
        printWidth = canvas.width()
        printHeight = canvas.height()
        printWin = window.open('','','width='+printWidth+',height='+printHeight)
        printWin.document.open();
        printWin.document.write(printContent)
        printWin.document.body.appendChild(svg);
        printWin.document.close()
        printWin.focus()
        printWin.print()
        #printWin.close()

      @cipLabes = (molecule) ->
        i = 0
        l = molecule.children.length
        stereoNodes = []
        while i < l
          if molecule.children[i].dType and molecule.children[i].dType == "bond"
            bond = molecule.children[i]
            if bond.stereo and (bond.stereo == 'hashed' or bond.stereo == 'wedged')
              ca = {}
              ca.atom = if bond.n_a.labels is undefined or bond.n_a.labels.atom is undefined or (bond.n_a.labels.atom.ele and bond.n_a.labels.atom.ele.symbol == "C") then Ele["C"] else undefined
              processed = false
              j = 0
              n = stereoNodes.length
              while j < n
                procNode = stereoNodes[j]
                if procNode.ref == bond.n_a.ref
                  processed = true
                  break
                j++
              if processed or ca.atom is undefined
                i++
                continue
              ca.cons = bond.n_a.connections.concat([bond])
              ca.node = bond.n_a
              stereoNodes.push ca.node
              nodes = []
              ii = 0
              ll = ca.cons.length
              while ii < ll
                conBond = ca.cons[ii]
                node = if ca.node.ref == conBond.n_a.ref then conBond.n_b else conBond.n_a
                nodes.push node if node
                ii++
              if @isStereoNode ca.node
                cipData = @mkBranches(nodes, ca.node)
                sortRef2 = @priorityOrder cipData.branches
                chiral = true
                j = 0
                k = sortRef2.length
                while j < k
                  if j > 0 and sortRef2[j-1][0] == sortRef2[j][0] then chiral = false
                  j++
                if chiral then console.log "this IS a chiral centre" else console.log "this is NOT a chiral centre"
                if chiral
                  angles = []
                  points = []
                  j = 0
                  k = sortRef2.length
                  while j < k
                    point = new Point
                      x: nodes[ sortRef2[j][1] ].point.x - ca.node.point.x
                      y: nodes[ sortRef2[j][1] ].point.y - ca.node.point.y
                    points.push point
                    if j == 0 then angles.push 0
                    else
                      angle = (if point.angle < 0 then 360 + point.angle else point.angle) - (if points[0].angle < 0 then 360 + points[0].angle else points[0].angle)
                      angles.push if angle < 0 then 360 + angle else angle
                    #console.log angles[j]
                    j++
                  if nodes.length == 3
                    console.log "\n"
                    if bond.stereo == "wedged"
                      if angles[1] < angles[2] then console.log "clockwise ( R )" else console.log "anti-clockwise ( S )"
                    else if angles[1] > angles[2] then console.log "clockwise ( R )" else console.log "anti-clockwise ( S )"
                  else if nodes.length == 4
                    if nodes[ sortRef2[3][1] ].parentBond.stereo then console.log nodes[ sortRef2[3][1] ].parentBond.stereo else console.log "/none"

          i++

      @priorityOrder = (branches) ->
        biggestLength = 0
        sortRef1 = []
        sortRef2 = []
        j = 0
        k = branches.length
        while j < k
          #console.log branches[j]
          sortRef1.push []
          sortRef2.push []
          if j == 0 then biggestLength = branches[j].length
          else if branches[j].length > biggestLength then biggestLength = branches[j].length
          j++
        j = 0
        k = biggestLength
        while j < k
          len = 0
          jj = 0
          kk = branches.length
          while jj < kk
            if branches[jj][j]
              if len == 0 then len = branches[jj][j].length
              else if len - branches[jj][j].length < 0 then len = branches[jj][j].length
            jj++
          jj = 0
          kk = branches.length
          while jj < kk
            if branches[jj][j]
              str = new String branches[jj][j].join("")
              diff = len - branches[jj][j].length
              if diff then sortRef1[jj].push new String (str + Array(diff+1).join(0))
              else sortRef1[jj].push str
            else
              sortRef1[jj].push new String Array(len+1).join(0)
            jj++
          j++
        j = 0
        k = sortRef1.length
        while j < k
          sortRef1[j].push j
          j++
        do ->
          i = 0
          l = biggestLength
          sortedIndx = []
          while i < l
            sortRef1.sort (a, b) ->
              if indexes
                j = 0
                k = indexes.length
                result = 0
                while j < k
                  procA = false
                  procB = false
                  ii = 0
                  ll = indexes[j].length
                  while ii < ll
                    ind = indexes[j][ii]
                    if a[i] == sortRef1[ind][i]
                      procA = true
                    else if b[i] == sortRef1[ind][i]
                      procB = true
                    if procA and procB
                      result = parseInt(b[i].valueOf()) - parseInt(a[i].valueOf())
                      j = k-1
                      break
                    ii++
                  j++
                result
              else parseInt(b[i].valueOf()) - parseInt(a[i].valueOf())
            ###
            j = 0
            k = sortRef1.length
            while j < k
              sortRef2[j].push (sortRef1[j].slice(0, sortRef1[j].length-1)).toString()
              sortRef2[j].push sortRef1[j][ sortRef1[j].length-1 ]
              console.log sortRef2[j]
              sortRef2[j] = []
              j++
            console.log '\n'
            ###
            indexes = []
            indexes[0] = []
            sect = 0
            j = 0
            k = sortRef1.length
            while j < k
              flag = sortRef1[j][biggestLength]
              if j > 0 and sortRef1[j][i].valueOf() == sortRef1[j-1][i].valueOf()
                indexes[sect].push(j-1, j)
              else if j > 0 and sortRef1[j][i].valueOf() != sortRef1[j-1][i].valueOf()
                if sortedIndx.indexOf(flag) == -1 then sortedIndx.push(flag)
                sect++
                indexes[sect] = []
              j++
            j = 0
            k = indexes.length
            while j < k
              indexes[j] = indexes[j].distinct()
              j++
            if sortedIndx.length == sortRef1.length-1 then break
            i++
        j = 0
        k = sortRef1.length
        while j < k
          sortRef2[j].push (sortRef1[j].slice(0, sortRef1[j].length-1)).toString()
          sortRef2[j].push sortRef1[j][ sortRef1[j].length-1 ]
          console.log sortRef2[j]
          j++
        sortRef2

      @isStereoNode = (node) ->
        bonds = node.connections.concat node.parentBond
        isStereo = false
        wedged = 0
        hashed = 0
        counter = 0
        connectedHs = 0
        i = 0
        l = bonds.length
        while i < l
          bond = bonds[i]
          farNode = if node.ref == bond.n_a.ref then bond.n_b else bond.n_a
          conAtom = if farNode.labels and farNode.labels.atom and farNode.labels.atom.ele then farNode.labels.atom.ele
          if conAtom and conAtom.symbol == "H" then connectedHs++
          counter++
          if bond.stereo
            if bond.stereo == "wedged"
              wedged++
            else if bond.stereo == "hashed"
              hashed++
          i++
        if counter == 4
          if wedged == 1 and hashed == 0
            isStereo = true
          else if wedged == 1 and hashed == 1
            isStereo = true
          else if wedged == 0 and hashed == 1
            isStereo = true
        else if counter == 3 and connectedHs == 0
          if wedged == 1 and hashed == 0
            isStereo = true
          else if wedged == 0 and hashed == 1
            isStereo = true
        isStereo

      @mkBranches = (rootNodes, caNode) ->
        root = []
        branches = []
        doubleBonds = []
        stereoCentres = []
        oldLevel = []
        i = 0
        l = rootNodes.length
        while i < l
          branches.push []
          doubleBonds.push []
          stereoCentres.push []
          oldLevel.push []
          node = rootNodes[i]
          root.push [node]
          i++

        genBranches = (rootLevel) ->
          nextLevel = []
          i = 0
          l = rootLevel.length
          while i < l
            branchLevel = rootLevel[i]
            nextLevel[i] = []
            nextBranch = nextLevel[i]
            addedNodes = branchLevel.concat(oldLevel[i])
            cip = []
            db = []
            st = []
            ii = 0
            ll = branchLevel.length
            while ii < ll
              node = branchLevel[ii]
              atom = (if node.labels and node.labels.atom and node.labels.atom.ele then node.labels.atom.ele else Ele["C"])
              if atom.symbol != "H"

                parentBond = node.parentBond
                hasStereoCon = false
                cons = 0
                j = 0
                n = node.connections.length
                while j < n
                  bond = node.connections[j]
                  cons++
                  if bond.bondOrder and bond.bondOrder > 1 then cons += bond.bondOrder - 1
                  if bond.stereo and (bond.stereo == "wedged" or bond.stereo == "hashed")
                    if bond.n_a.ref = node.ref
                      hasStereoCon = true
                  nextNode = if node.ref == bond.n_a.ref then bond.n_b else bond.n_a
                  jj = 0
                  k = addedNodes.length
                  nodeProcd = false
                  while jj < k
                    if nextNode.ref == addedNodes[jj].ref
                      nodeProcd = true
                      break
                    jj++
                  if nextNode.ref == caNode.ref
                    gostCA = new BondNode()
                    gostCA.labels = {}
                    gostCA.labels.atom = {}
                    gostCA.labels.atom.ele = Ele["C"]
                    nextBranch.push gostCA
                  else if nodeProcd == false then nextBranch.push nextNode
                  j++

                implicitHs = atom.valence - (cons + 1)
                if parentBond and parentBond.bondOrder
                    implicitHs -= parentBond.bondOrder - 1
                j = 0
                n = implicitHs
                while j < n
                  H = new BondNode()
                  H.labels = {}
                  H.labels.atom = {}
                  H.labels.atom.ele = Ele["H"]
                  nextBranch.push H
                  j++
                if parentBond
                  if hasStereoCon or
                  (node.parentBond.stereo and
                  (node.parentBond.stereo == 'wedged' or node.parentBond.stereo == 'hashed') and node.parentBond.n_a.ref == node.ref) then st.push node
                  if parentBond.bondOrder
                    if parentBond.bondOrder == 2 then db.push parentBond
                    j = 0
                    n = parentBond.bondOrder
                    while j < n
                      cip.push atom.atomicNumber
                      j++
                  else
                    cip.push atom.atomicNumber
                else
                  cip.push atom.atomicNumber

              else cip.push atom.atomicNumber

              ii++
            if cip.length
              cip.sort (a, b) ->
                b - a
              branches[i].push cip
              doubleBonds[i].push db
              stereoCentres[i].push st
            i++
          count = 0
          i = 0
          l = nextLevel.length
          while i < l
            if nextLevel[i].length == 0 then count++
            i++
          if nextLevel.length and nextLevel.length != count
            oldLevel = rootLevel.concat []
            genBranches(nextLevel)

        genBranches root
        data =
          branches: branches
          doubleBonds: doubleBonds
          stereoCentres: stereoCentres

      @connect = (bond1, bond2, point, b2Node) ->

        bond1.n_a = new BondNode(bond1.segments[0], bond1.segments[0].point, bond1) unless bond1.n_a
        bond1.n_b = new BondNode(bond1.segments[1], bond1.segments[1].point, bond1) unless bond1.n_b
        bond2.n_a = new BondNode(bond2.segments[0], bond2.segments[0].point, bond2) unless bond2.n_a
        bond2.n_b = new BondNode(bond2.segments[1], bond2.segments[1].point, bond2) unless bond2.n_b

        existingCons1 = bond1.n_a.connections.concat(bond1.n_b.connections)
        existingCons2 = bond2.n_a.connections.concat(bond2.n_b.connections)
        index1 = existingCons1.indexOf bond2
        index2 = existingCons2.indexOf bond1
        if index2 isnt -1 or index1 isnt -1
          console.log "already connected"
          return false
        else @reconnect(bond1, bond2, point, b2Node)

      @reconnect = (bond1, bond2, point, b2Node) ->

        if b2Node is undefined
          b2Node = bond2.n_a
        else
          b2Node = bond2.n_b

        if point.getDistance(bond1.n_a.segment.point, true) - point.getDistance(bond1.n_b.segment.point, true) < 0
          node = bond1.n_a
        else
          node = bond1.n_b

        b2Node.ref = node.ref

        i = 0
        l = node.connections.length
        while i < l
          dist1 = point.getDistance(node.connections[i].n_a.segment.point, true)
          dist2 = point.getDistance(node.connections[i].n_b.segment.point, true)
          b2Node.connections.push node.connections[i]

          if dist1 - dist2 < 0
            node1 = node.connections[i].n_a
          else
            node1 = node.connections[i].n_b
          node1.connections.push bond2
          i++
        node.connections.push bond2
        index = b2Node.connections.indexOf(bond1)
        if index == -1 then b2Node.connections.push bond1
        @checkMolecule(bond1.molecule)
        true

      @deleteFromNode = (bond, node) =>
        if node.connections.length
          i = 0
          l = node.connections.length
          while i < l
            connBond = node.connections[i]
            dist1 = node.segment.point.getDistance(connBond.n_a.segment.point, true)
            dist2 = node.segment.point.getDistance(connBond.n_b.segment.point, true)
            if dist1 - dist2 < 0
              node1 = connBond.n_a
            else
              node1 = connBond.n_b
            ll = node1.connections.length - 1
            while ll > -1
              if bond== node1.connections[ll]
                node1.connections.splice(ll, 1)
              ll--
            i++

      @deleteBond = (bond) ->
        if bond.n_a
          @deleteFromNode(bond, bond.n_a)
        if bond.n_b
          @deleteFromNode(bond, bond.n_b)
        molecule = bond.molecule
        if bond.highlight then @deselectBond(bond)
        bond.remove()
        molecules = @checkMolecule(molecule)
        action = new DeleteBondAction(this, molecule, bond, molecules)
        @historyManager.addAction action

      @iDelete = =>
        hitResult = @project.hitTest(@mouseLoc, @hitOptions)
        if hitResult and hitResult.type == "stroke"
          if hitResult.item.bondType and hitResult.item.bondType == "aux"
            return
          molecule = hitResult.item.molecule
          @deleteBond(hitResult.item)
          #if molecule.children.length == 0 then molecule.remove()
          @lastPoint = undefined
          @cancelDrawing = undefined

        else if hitResult and hitResult.type == "fill"
          if hitResult.item.dType and hitResult.item.dType == "label"
            molecule = hitResult.item.molecule
            @deleteLabel(hitResult.item)
            if molecule.children.length == 0 then molecule.remove()
            @lastPoint = undefined
            @cancelDrawing = true

      @bondLength = 23

      @getBondOptions = (points) ->
        opts =
          segments: points
          strokeColor: 'black'
          strokeWidth: 1.4
          strokeCap: 'round'
          strokeJoin: 'round'
          selected: false
        opts
      @setHashedOptions = (bond) ->
        bond.style =
          closed: false
          dashArray: [1.5, 2.8]
          strokeWidth: 4
          strokeCap: 'butt'
          dashOffset: 0

      @setWedgedOptions = (bond) ->
        bond.style =
          fillColor: 'black'
          strokeCap: 'butt'
          strokeWidth: 1.5
        bond.closed = true

      @setSingleOptions = (bond) ->
        bond.style =
          closed: false
          strokeWidth: 1.4
          strokeCap: 'round'

      @hitOptions =
        segments: true
        stroke: true
        fill: true
        tolerance: 5

      @altHitOptions =
        segments: true
        stroke: true
        fill: true
        tolerance: 2

      @midHitOptions =
        segments: true
        stroke: true
        fill: true
        tolerance: 0


      tool = new @Tool()

      @redrawMultipleBonds = (bond) ->
        if bond and bond.multiple
          ii = 0
          ll = bond.multiple.length
          while ii < ll
            offSet1 = bond.segments[0].point
            offSet2 = bond.segments[1].point
            if bond.n_a and bond.n_a.connections.length > 0
              if bond.n_a.labels is undefined or bond.n_a.labels.atom is undefined
                offSet1 = bond.getPointAt(2.5)
            if bond.n_b and bond.n_b.connections.length > 0
              if bond.n_b.labels is undefined or bond.n_b.labels.atom is undefined
                offSet2 = bond.getPointAt(bond.length - 2)
            dx = offSet1.x - offSet2.x
            dy = offSet1.y - offSet2.y
            theta = Math.atan2(dy, dx)
            if bond.multiple.length == 1 and bond.multiple[0].generator
              phi = eval(bond.multiple[0].generator)
            else
              phi = theta + Math.PI / 2
              bond.multiple[0].generator = 'theta + Math.PI / 2'
            if ii == 1 then phi = theta - Math.PI / 2
            dx1 = Math.cos(phi) * @bondLength / 6
            dy1 = Math.sin(phi) * @bondLength / 6
            dPoint = new @Point
              x: offSet1.x + dx1
              y: offSet1.y + dy1
            dPoint1 = new @Point
              x: offSet2.x + dx1
              y: offSet2.y + dy1
            bond.multiple[ii].segments[0].point = dPoint
            bond.multiple[ii].segments[1].point = dPoint1
            ii++
          true
        else
          false

      @mkDoubleBond = (e, bond) ->
        if bond.bondType and bond.bondType == "aux"
          bond = bond.mainBond
        if bond.bondOrder is undefined or bond.bondOrder == 1
          offSet1 = bond.segments[0].point
          offSet2 = bond.segments[1].point
          if bond.n_a and bond.n_a.connections.length > 0
            if bond.n_a.labels is undefined or bond.n_a.labels.atom is undefined
              offSet1 = bond.getPointAt(2.5)
          if bond.n_b and bond.n_b.connections.length > 0
            if bond.n_b.labels is undefined or bond.n_b.labels.atom is undefined
              offSet2 = bond.getPointAt(bond.length - 2)
          dx = offSet1.x - offSet2.x
          dy = offSet1.y - offSet2.y
          theta = Math.atan2(dy, dx)

          phi = theta + Math.PI / 2
          dx1 = Math.cos(phi) * @bondLength / 6
          dy1 = Math.sin(phi) * @bondLength / 6

          dPoint = new @Point
            x: offSet1.x + dx1
            y: offSet1.y + dy1
          dPoint1 = new @Point
            x: offSet2.x + dx1
            y: offSet2.y + dy1
          doubleBond = new @Path @getBondOptions([dPoint, dPoint1])
          doubleBond.bondType = "aux"
          doubleBond.mainBond = bond
          doubleBond.dType = 'bond'
          bond.molecule.addChild(doubleBond)
          bond.multiple = []
          bond.multiple.push doubleBond
          bond.bondOrder = 2

        else if bond.bondOrder == 2
          nPoint = bond.getNearestPoint(bond.multiple[0].segments[0].point)
          dx = nPoint.x - bond.multiple[0].segments[0].point.x
          dy = nPoint.y - bond.multiple[0].segments[0].point.y
          theta = Math.atan2(dy, dx)
          dx1 = 2 * Math.cos(theta) * @bondLength / 6
          dy1 = 2 * Math.sin(theta) * @bondLength / 6
          if bond.multiple[0].generator and bond.multiple[0].generator[6] == "-"
            bond.multiple[0].generator = 'theta + Math.PI / 2'
          else
            bond.multiple[0].generator = 'theta - Math.PI / 2'
          bond.multiple[0].segments[0].point.x += dx1
          bond.multiple[0].segments[0].point.y += dy1
          bond.multiple[0].segments[1].point.x += dx1
          bond.multiple[0].segments[1].point.y += dy1

        else if bond.bondOrder == 3
          extra = bond.multiple[1]
          bond.multiple.splice(1, 1)
          extra.remove()
          bond.multiple[0].segments[0].point = dPoint
          bond.multiple[0].segments[1].point = dPoint1
          bond.bondOrder = 2
        bond

      @mkRing = (hitResult, size) =>
        newBonds = []
        _mkRing = (bond, size) =>
          seg1 = if bond.n_b then bond.n_b.segment else bond.segments[1]
          seg2 = if bond.n_a then bond.n_a.segment else bond.segments[0]
          i = 0
          l = 5
          if size then l = size - 1
          while i < l
            dx = seg2.point.x - seg1.point.x
            dy = seg2.point.y - seg1.point.y
            theta = Math.atan2(dy, dx)

            if theta > Math.PI then theta -= Math.PI
            if theta < -1*Math.PI then theta += Math.PI

            if size
              if size == 6
                phi = theta - 60 * Math.PI / 180
              else if size == 5
                phi = theta - 72 * Math.PI / 180
              else if size == 7
                phi = theta - 51.4285714 * Math.PI / 180
              else if size == 3
                phi = theta - 120 * Math.PI / 180
              else if size == 4
                phi = theta - 90 * Math.PI / 180
              else if size == 8
                phi = theta - 45 * Math.PI / 180
            else
              phi = theta - 60 * Math.PI / 180

            dx1 = Math.cos(phi) * bond.length
            dy1 = Math.sin(phi) * bond.length

            lastPoint = new @Point
              x: seg2.point.x + dx1
              y: seg2.point.y + dy1

            middlePoint = new @Point
              x: lastPoint.x + (seg2.point.x - lastPoint.x)/2
              y: lastPoint.y + (seg2.point.y - lastPoint.y)/2

            middleHitResult = @project.hitTest(middlePoint, @midHitOptions)
            testHitResult = @project.hitTest(lastPoint, @altHitOptions)
            if testHitResult and testHitResult.type == "segment" then lastPoint = testHitResult.segment.point

            if middleHitResult and middleHitResult.type == 'stroke'
              newBond = middleHitResult.item
            else
              newBond = new @Path @getBondOptions([seg2.point, lastPoint])
              newBond.dType = 'bond'
              bond.molecule.addChild(newBond)
              newBond.molecule = bond.molecule

              @connect(bond, newBond, seg2.point)
              if testHitResult and testHitResult.type == "segment"
                @connect(testHitResult.item, newBond, testHitResult.point, "alt")
            newBonds.push newBond unless middleHitResult
            bond = newBond
            if lastPoint.getDistance(bond.n_a.segment.point, true) - lastPoint.getDistance(bond.n_b.segment.point, true) < 0
              seg1 = bond.n_b.segment
              seg2 = bond.n_a.segment
            else
              seg2 = bond.n_b.segment
              seg1 = bond.n_a.segment
            newBond = undefined
            i++
          newBonds

        if hitResult and hitResult.item.dType and hitResult.item.dType = 'bond'
          bond = hitResult.item
          _mkRing(bond, size)

        else if hitResult is null
          if size
            if size == 8 or size == 3 or size == 4
              phi = 0
            if size == 5
              phi = 36 * Math.PI / 180
            if size == 7
              phi = 25.7142857 * Math.PI / 180
            if size == 6
              phi = 30 * Math.PI / 180
          else phi = 30 * Math.PI / 180
          dx1 = Math.cos(phi) * @bondLength
          dy1 = Math.sin(phi) * @bondLength

          point = new @Point
            x: @mouseLoc.x + dx1
            y: @mouseLoc.y - dy1

          initBond = new @Path @getBondOptions([point, @mouseLoc])
          initBond.dType = 'bond'
          initMolecule = new @Group(initBond)
          initMolecule.children[0].molecule = initMolecule
          newBonds.push initBond
          _mkRing(initBond, size)

      @mol2CanSmiles = (data) ->
        data = data.replace(/[ \t]/g, "?")
        mol =
          data: data
        molJson = JSON.stringify mol
        $.ajax
          url: "/convMol2Smiles"
          type: "post"
          processData: false
          contentType: 'application/json'
          dataType: "json"
          data: molJson
          success: (response) =>
            if response
              console.log response.smiles
          error: (err) ->
            "Error: " + err

      @smiles2Mol = (data) =>
        data = "C[C@H](c1ccc2c(n1)ccc1c2cccc1)C1CCCC1"
        smi =
          data: data
        smiJson = JSON.stringify smi
        $.ajax
          url: "/convSmiles2Mol"
          type: "post"
          processData: false
          contentType: 'application/json'
          dataType: "json"
          data: smiJson
          success: (response) =>
            if response
              molInter = new MOLInterpreter this
              molInter.read response.mol
          error: (err) ->
            "Error: " + err

      @addUpdateLabel = (e, hitResult, atomLabel) =>
        keys = if e and e.key then e.key.length else 1 unless atomLabel is undefined
        keys = 1 if atomLabel
        if hitResult and hitResult.type == "segment" and keys == 1
          bond = hitResult.item
          if bond.bondType == 'aux' then bond = bond.mainBond
          atomLabel = e.key.toUpperCase() unless atomLabel
          atomLabel = atomLabel.replace(/(^\s+|\s+$)/g, '')
          seg1 = if bond.n_a then bond.n_a.segment else bond.segments[0]
          seg2 = if bond.n_b then bond.n_b.segment else bond.segments[1]
          bond.n_a.labels = {} unless bond.n_a.labels
          bond.n_b.labels = {} unless bond.n_b.labels
          if hitResult.segment.point.getDistance(seg1.point, true) - hitResult.segment.point.getDistance(seg2.point, true) < 0
            closeNode = bond.n_a
          else
            closeNode = bond.n_b
          if closeNode.labels.atom is undefined
            point = new @Point
              x: closeNode.segment.point.x
              y: closeNode.segment.point.y + 3.5
            label = closeNode.labels.atom = new @PointText(point)
            label.justification = 'center'
            label.fillColor = 'black'
            label.content = atomLabel
            label.fontSize = 14
            if Ele[label.content]
              label.ele = Ele[label.content]
            else
              label.ele is undefined
            rect = new @Rectangle
              point: label.bounds.point
              size: new @Size
                width: label.bounds.width + 6
                height: label.bounds.height
            rect.center.x -= 3
            label.rect = new @Path.Ellipse rect
            label.rect.visible = false
            label.rect.dType = 'bounds'
            label.dType = 'label'
            bond.molecule.addChild(label)
            bond.molecule.addChild(label.rect)
            label.molecule = bond.molecule
            cons = []
            i = 0
            l = closeNode.connections.length
            while i < l
              cons.push closeNode.connections[i]
              i++
            label.connections = cons
            label.connections.push bond
            @addLabelToNode(closeNode, label)
            @updateBonds(label.connections, closeNode.segment.point)
            action = new NewAtomLabelAction this, closeNode, label
            @historyManager.addAction action

        else if hitResult and hitResult.type == "fill" and e.key.length == 1
          label = hitResult.item
          label.content = label.content + e.character
          if Ele[label.content.substring(0,2)]
            label.ele = Ele[label.content.substring(0,2)]

          else
            label.ele is undefined
          rectIndex = label.molecule.children.indexOf(label.rect)
          label.molecule.children.splice(rectIndex, 1)
          label.rect.remove()
          rect = new @Rectangle
            point: label.bounds.point
            size: new @Size
              width: label.bounds.width + 6
              height: label.bounds.height
          rect.point.x -= 3
          label.rect = new @Path.Ellipse rect
          label.rect.visible = false
          label.molecule.addChild(label.rect)
          point = new @Point
            x: label.point.x
            y: label.point.y - 3.5
          @updateBonds(label.connections, point)

      tool.onKeyDown = (e) =>

        if e.key == '+'
          if @view.zoom < 5
            @view.zoom += 0.5
          return
        if e.key == '-'
          if @view.zoom > 1
            @view.zoom -= 0.5
          return

        if e.key == 'b'
          i = 0
          l = @molLayer.children.length
          while i < l
            molecule = @molLayer.children[i]
            if molecule.children.length
              @cipLabes molecule
              i = l - 1
            i++
          return

        hitResult = @project.hitTest(@mouseLoc, @hitOptions)

        if e.key == 'n' and hitResult is null
          i = 0
          l = @molLayer.children.length
          while i < l
            if @molLayer.children[i].type == 'group'
              @checkMolecule(@molLayer.children[i])
              console.log @molLayer.children[i].bonds.length
              console.log @molLayer.children[i].labels.length
              console.log @molLayer.children[i].nodes.length
              console.log @molLayer.children[i]
              console.log "\n\n"
            i++

        if e.key == 'z' and hitResult is null
          molInter = new MOLInterpreter this
          molecules = @molLayer.children
          i = 0
          l = molecules.length
          while i < l
            molecule = molecules[i]
            if molecule.children.length
              molString = molInter.write molecule
              break
            i++
          if molString
            molInter.read(molString)
        if e.key == 'e' and hitResult is null
          exp = new Exporter this
          exp.canvasToSvg()
          return

        if e.key == 'm' and hitResult is null
          molInter = new MOLInterpreter this
          molecules = @molLayer.children
          i = 0
          l = molecules.length
          while i < l
            molecule = molecules[i]
            if molecule.children.length
              molString = molInter.write molecule
              break
            i++
          if molString
            @mol2CanSmiles molString

        if e.key == '1' and hitResult is null
          @smiles2Mol()
          return
        if hitResult and hitResult.item
          if hitResult.type == 'stroke' or hitResult.type == 'segment'
            bond = hitResult.item
        else return
        if e.key == 'x' then @geometry = 'E'
        if e.key == 's' and hitResult and hitResult.type == "stroke"
          if bond.bondType and bond.bondType == "aux"
            bond = bond.mainBond
          if bond.bondOrder and bond.bondOrder isnt 1
            i = 0
            l = bond.multiple.length
            while i < l
              extra = bond.multiple[i]
              bond.multiple.splice(0, 1)
              extra.remove()
              bond.bondOrder = 1
              i++

        if e.key == 'd'
          @mkDoubleBond(e, hitResult)
        if e.key == 'w'
          @mkWedgedBond(hitResult)
        if e.key == 'h' and hitResult and hitResult.type == 'stroke'
          @mkHashedBond(hitResult)
        if e.key == '6' or e.key == '5' or e.key == '7' or e.key == '3' or e.key == '4' or e.key == '8'
          @mkRing(hitResult, Number e.key)

        if (e.key == 'backspace' or e.key == 'q') and @mouseLoc
          @iDelete()
          return

        if e.key == 'p'
          if @targetPoint then @deselectCloseNode(@targetPoint.segment)
          @targetPoint = undefined
          if @currHitItem
            if @currHitItem.type
              @deselectBond(@currHitItem)
              @currHitItem = undefined
            else
              @deselectCloseNode(@currHitItem)
              @currHitItem = undefined
          @view.draw()
          i = 0
          l = @project.activeLayer.children.length
          while i < l
            #if @project.activeLayer.children[i].children.length > 0
            console.log @project.activeLayer.children[i].children.length
            i++
          console.log @project.activeLayer.children.length
          @data = {}
          @data.molecules = []
          i = 0
          l = @project.activeLayer.children.length
          while i < l
            if @project.activeLayer.children[i].type == 'group' and @project.activeLayer.children[i].children.length > 0
              molecule = @molLayer.children[i]
              console.log 'molecule:'
              console.log molecule
              moleculeData = []
              ii = 0
              ll = molecule.children.length
              while ii < ll
                bond = molecule.children[ii]
                bondData = {}
                bondData.segs = []
                bondData.segs[0] =
                  x: bond.segments[0].point.x
                  y: bond.segments[0].point.y
                bondData.segs[1] =
                  x: bond.segments[1].point.x
                  y: bond.segments[1].point.y
                if bond.n_a
                  bondData.n_a = {}
                  if bond.n_a.connections and bond.n_a.connections.length > 0
                    conns = []
                    j = 0
                    jl = bond.n_a.connections.length
                    while j < jl
                      conns.push bond.n_a.connections[j].index
                      j++
                    bondData.n_a.cons = conns
                  else bondData.n_a.cons = []

                if bond.n_b
                  bondData.n_b = {}
                  if bond.n_b.connections and bond.n_b.connections.length > 0
                    conns = []
                    j = 0
                    jl = bond.n_b.connections.length
                    while j < jl
                      conns.push bond.n_b.connections[j].index
                      j++
                    bondData.n_b.cons = conns
                  else bondData.n_b.cons = []

                if bond.multiple
                  if bond.multiple.length > 0
                    multi = []
                    j = 0
                    jl = bond.multiple.length
                    while j < jl
                      multi.push bond.multiple[j].index
                      j++
                    bondData.multi = multi
                  else bondData.multi = []
                if bond.bondOrder then bondData.bO = bond.bondOrder
                if bond.bondType then bondData.bT = bond.bondType
                if bond.generator then bondData.gen = bond.generator
                if bond.dType then bondData.dT = bond.dType
                if bond.mainBond then bondData.mB = bond.mainBond.index

                moleculeData.push bondData
                ii++
            if moleculeData and moleculeData.length then @data.molecules.push moleculeData
            moleculeData = undefined
            i++
          @dataStr = JSON.stringify(@data)
          console.log @dataStr

        if e.key == 'u' and @dataStr
          @project.clear()
          layer = new @Layer()
          layer.activate()
          setTimeout( =>
            data = JSON.parse(@dataStr)
            console.log data
            i = 0
            l = data.molecules.length
            while i < l
              molecule = data.molecules[i]
              m = new @Group()
              ii = 0
              ll = molecule.length
              while ii < ll
                if molecule[ii].dT and molecule[ii].dT == 'bond'
                  bond = molecule[ii]
                  p1 = new @Point
                    x: bond.segs[0].x
                    y: bond.segs[0].y
                  p2 = new @Point
                    x: bond.segs[1].x
                    y: bond.segs[1].y
                  b = new @Path @getBondOptions([p1, p2])
                  if bond.bO then b.bondOrder = bond.bO
                  if bond.bT then b.bondType = bond.bT
                  if bond.gen then b.generator = bond.gen
                  if bond.dT then b.dType = bond.dT
                  b.molecule = m
                  m.addChild(b)
                ii++
              j = 0
              jl = m.children.length
              while j < jl
                m.children[j]
                if m.children[j].dType and m.children[j].dType == 'bond'
                  b = m.children[j]
                  bond = molecule[j]
                  if bond.mB then b.mainBond = m.children[bond.mB]
                  if bond.multi
                    b.multiple = []
                    if bond.multi[0]
                      b.multiple[0] = m.children[bond.multi[0]]
                    if bond.multi[1]
                      b.multiple[1] = m.children[bond.multi[1]]
                  b.n_a = {}
                  b.n_b = {}
                  b.n_a.segment = b.segments[0]
                  b.n_a.point = b.segments[0].point
                  b.n_b.segment = b.segments[1]
                  b.n_b.point = b.segments[1].point
                  b.n_a.connections = []
                  b.n_b.connections = []

                  if bond.n_a and bond.n_a.cons
                    jj = 0
                    jjl = bond.n_a.cons.length
                    while jj < jjl
                      index = bond.n_a.cons[jj]
                      b.n_a.connections.push m.children[index]
                      jj++
                  if bond.n_b and bond.n_b.cons
                    jj = 0
                    jjl = bond.n_b.cons.length
                    while jj < jjl
                      index = bond.n_b.cons[jj]
                      b.n_b.connections.push m.children[index]
                      jj++
                j++
              i++
          , 200)

        if hitResult and ( hitResult.type == "segment" or hitResult.type == "fill" )

          if hitResult.type == "segment" and e.key.length == 1
            @addUpdateLabel(e, hitResult)
            return
            seg1 = if bond.n_a then bond.n_a.segment else bond.segments[0]
            seg2 = if bond.n_b then bond.n_b.segment else bond.segments[1]
            bond.n_a.labels = {} unless bond.n_a.labels
            bond.n_b.labels = {} unless bond.n_b.labels
            if hitResult.segment.point.getDistance(seg1.point, true) - hitResult.segment.point.getDistance(seg2.point, true) < 0
              closeNode = bond.n_a
            else
              closeNode = bond.n_b
            if closeNode.labels.atom is undefined
              point = new @Point(closeNode.segment.point.x, closeNode.segment.point.y + 3.5)
              label = closeNode.labels.atom = new @PointText(point)
              label.justification = 'center'
              label.fillColor = 'black'
              label.content = e.key.toUpperCase()
              label.fontSize = 13
              if Ele[label.content]
                label.ele = Ele[label.content]
              else
                label.ele is undefined
              rect = new @Rectangle
               point: label.bounds.point
               size: new @Size
                width: label.bounds.width + 8
                height: label.bounds.height
              rect.point.x -= 4
              label.rect = new @Path.Ellipse rect
              label.rect.visible = false
              label.rect.dType = 'bounds'
              label.dType = 'label'
              bond.molecule.addChild(label)
              bond.molecule.addChild(label.rect)
              label.molecule = bond.molecule
              cons = []
              i = 0
              l = closeNode.connections.length
              while i < l
                cons.push closeNode.connections[i]
                i++
              label.connections = cons
              label.connections.push bond
              @addLabelToNode(closeNode, label)
              @updateBonds(label.connections, closeNode.segment.point, label.bounds.center)

          else if hitResult.type == "fill" and e.key.length == 1
            label = hitResult.item
            label.content = label.content + e.character
            if Ele[label.content.substring(0,2)]
              label.ele = Ele[label.content.substring(0,2)]
            else
              label.ele is undefined
            rectIndex = label.molecule.children.indexOf(label.rect)
            label.molecule.children.splice(rectIndex, 1)
            label.rect.remove()
            rect = new @Rectangle
              point: label.bounds.point
              size: new @Size
                width: label.bounds.width + 8
                height: label.bounds.height
            rect.point.x -= 4
            label.rect = new @Path.Ellipse rect
            label.rect.visible = false
            label.molecule.addChild(label.rect)
            point = new @Point
              x: label.point.x
              y: label.point.y - 3.5
            @updateBonds(label.connections, point, point)

        false

      @addLabelToNode = (node, atom) ->
        i = 0
        l = node.connections.length
        while i < l
          bond = node.connections[i]
          bond.n_a.labels = {} unless bond.n_a.labels
          bond.n_b.labels = {} unless bond.n_b.labels
          if node.point.getDistance(bond.n_a.segment.point, true) - node.point.getDistance(bond.n_b.segment.point, true) < 0
            closeNode = bond.n_a
          else
            closeNode = bond.n_b

          if closeNode.labels.atom
            label = closeNode.labels.atom
            label.content = atom.content
          else
            closeNode.labels.atom = atom
          i++
        if atom.molecule.children.indexOf(atom) == -1
          atom.molecule.addChild atom
          atom.molecule.addChild atom.rect
        true

      @deleteLabel = (label) =>
        molecule = label.molecule
        i = 0
        l = label.connections.length
        while i < l
          if label.connections[i].dType and label.connections[i].dType == 'bond'
            bond = label.connections[i]
            if label.point.getDistance(bond.n_a.segment.point, true) - label.point.getDistance(bond.n_b.segment.point, true) < 0
              closeNode = bond.n_a
            else closeNode = bond.n_b
            closeNode.labels.atom = undefined
          i++
        point = new @Point(label.point.x, label.point.y - 3.5)
        label.rect.remove()
        label.remove()
        @updateBonds(label.connections, point, point)
        #@checkMolecule(molecule)

      @mkHashedBond = (bond) =>
        if bond.bondType and bond.bondType == "aux"
          bond = bond.mainBond
          i = 0
          l = bond.multiple.length
          while i < l
            dBond = bond.multiple[i]
            bond.multiple.splice(i, 1)
            dBond.remove()
            i++
          bond.bondOrder = 1
        bond.stereo = 'hashed'
        @setHashedOptions(bond)

      @mkWedgedBond = (bond, wedgedBond) =>
        if wedgedBond then bond = wedgedBond
        if bond is undefined then return
        if bond.bondType and bond.bondType == "aux"
          bond = bond.mainBond
          i = 0
          l = bond.multiple.length
          while i < l
            dBond = bond.multiple[i]
            bond.multiple.splice(i, 1)
            dBond.remove()
            i++
          bond.bondOrder = 1

        if bond.wGen and wedgedBond is undefined
          ref1 = eval(bond.wGen.ref1)
          ref2 = eval(bond.wGen.ref2)
        else if wedgedBond
          ref1 = eval(bond.wGen.ref2)
          ref2 = eval(bond.wGen.ref1)
        else
          bond.wGen =
            ref1: 'bond.n_b.segment'
            ref2: 'bond.n_a.segment'
          ref1 = bond.n_b.segment
          ref2 = bond.n_a.segment

        pointRef = new @Point
          x: ref2.point.x - ref1.point.x
          y: ref2.point.y - ref1.point.y

        p1 = new @Point
          length: @bondLength * 0.1
          angle: pointRef.angle + 90

        p2 = new @Point
          length: @bondLength * 0.1
          angle: pointRef.angle - 90

        p1 = new @Point
          x: p1.x + ref1.point.x
          y: p1.y + ref1.point.y

        p2 = new @Point
          x: p2.x + ref1.point.x
          y: p2.y + ref1.point.y

        if bond.segments.length == 2
          bond.segments[0].point = ref2.point
          bond.insert(1, p1)
          bond.segments[2].point = ref1.point
          bond.add(p2)
        else
          bond.segments[0].point = ref2.point
          bond.segments[1].point = p1
          bond.segments[2].point = ref1.point
          bond.segments[3].point = p2

        if bond.stereo is undefined or bond.stereo isnt 'wedged'
          bond.stereo = 'wedged'
          @setWedgedOptions(bond)
        if wedgedBond is undefined

          if bond.wGen.ref1 == 'bond.n_b.segment'
            bond.n_a.segment = bond.segments[0]
            bond.n_b.segment = bond.segments[2]
          else
            bond.n_a.segment = bond.segments[2]
            bond.n_b.segment = bond.segments[0]

          bond.wGen =
            ref1: bond.wGen.ref2
            ref2: bond.wGen.ref1

      @updateBonds = (connections, pos, newPos) =>
        i = 0
        l = connections.length
        while i < l
          bond = connections[i]
          seg1 = if bond.n_a then bond.n_a.segment else bond.segments[0]
          seg2 = if bond.n_b then bond.n_b.segment else bond.segments[1]

          if pos.getDistance(seg1.point, true) - pos.getDistance(seg2.point, true) < 0
            closeNode = bond.n_a
            farNode = bond.n_b
          else
            closeNode = bond.n_b
            farNode = bond.n_a

          if closeNode.labels and closeNode.labels.atom
            label = closeNode.labels.atom
            nodePoint = new @Point
              x: label.point.x
              y: label.point.y - 3.5

            closeNode.point = closeNode.segment.point = nodePoint

            if bond.stereo and bond.stereo == 'wedged'
              @mkWedgedBond('alt', bond)

            ints = bond.getIntersections(closeNode.labels.atom.rect)
            if ints.length == 1 then closeNode.segment.point = ints[0].point
            if ints.length == 2
              intPoint = new @Point
                x: ints[0].point.x + (ints[1].point.x - ints[0].point.x)/2
                y: ints[0].point.y + (ints[1].point.y - ints[0].point.y)/2
              closeNode.segment.point = intPoint
          else if newPos
            closeNode.segment.point = newPos
            closeNode.point = newPos

          if farNode.labels and farNode.labels.atom
            farlabel = farNode.labels.atom
            nodePoint = new @Point
             x: farlabel.point.x
             y: farlabel.point.y - 3.5

            farNode.point = farNode.segment.point = nodePoint

            if bond.stereo and bond.stereo == 'wedged'
              @mkWedgedBond('alt', bond)

            ints = bond.getIntersections(farNode.labels.atom.rect)
            if ints.length == 1 then farNode.segment.point = ints[0].point
            if ints.length == 2
              intPoint = new @Point
                x: ints[0].point.x + (ints[1].point.x - ints[0].point.x)/2
                y: ints[0].point.y + (ints[1].point.y - ints[0].point.y)/2
              farNode.segment.point = intPoint

          @redrawMultipleBonds(bond)
          if bond.stereo and bond.stereo == 'wedged'
            @mkWedgedBond('alt', bond)
          i++

      @importProject = (data) ->
        dataObj = JSON.parse(data)
        @project.clear()
        @project.importJSON(dataObj.string)
        projectMap = JSON.parse(dataObj.map)

      @selectBond = (bond) =>
        if bond.bondType and bond.bondType = "aux"
          @selectBond(bond.mainBond)
        else
          length = bond.segments[0].point.getDistance(bond.segments[1].point)
          norm = new Point
            x: bond.segments[0].point.x - bond.bounds.center.x
            y: bond.segments[0].point.y - bond.bounds.center.y
          bond.highlight = new @Path.Rectangle
            point: [bond.bounds.center.x - (length-0.1*length)/2, bond.bounds.center.y - 2.5]
            size: [length-0.1*length, 5]
          bond.highlight.rotate(norm.angle)
          bond.highlight.fillColor = '#3399FF'
          bond.highlight.sendToBack()

      @deselectBond = (bond) =>
        if bond.bondType and bond.bondType = "aux"
          @deselectBond(bond.mainBond)
        else if bond.highlight
          bond.highlight.remove()
          bond.highlight = undefined

      @selectCloseNode = (segment) =>
        segment.highlight = new @Path.RegularPolygon
          center: segment.point
          sides: 4
          radius: 5
          fillColor: '#3399FF'
        segment.highlight.sendToBack()

      @deselectCloseNode = (segment) =>
        if segment and segment.highlight
          segment.highlight.remove()
          segment.highlight = undefined

      if mobBrowser is false
        tool.onMouseMove = (e) =>
          if @targetPoint then @deselectCloseNode(@targetPoint.segment)
          @targetPoint = undefined
          @mouseLoc = e.point
          hitResult = @project.hitTest(e.point, @hitOptions)

          if hitResult and hitResult.item.dType and hitResult.item.dType is 'bond'
            if @currHitItem
              if @currHitItem.type
                @deselectBond(@currHitItem)
                @currHitItem = undefined
              else
                @deselectCloseNode(@currHitItem)
                @currHitItem = undefined

            if hitResult.type == 'stroke'
              @selectBond(hitResult.item)
              @currHitItem = hitResult.item

            else if hitResult.type == 'segment'
              bond = hitResult.item
              segment = hitResult.segment
              if bond.bondType and bond.bondType == "aux"
                bond = bond.mainBond
                if e.point.getDistance(bond.n_a.segment.point, true) - e.point.getDistance(bond.n_b.segment.point, true) < 0
                  segment = bond.n_a.segment
                else
                  segment = bond.n_b.segment
              if bond.stereo and bond.stereo == 'wedged'
                if e.point.getDistance(bond.n_a.segment.point, true) - e.point.getDistance(bond.n_b.segment.point, true) < 0
                  segment = bond.n_a.segment
                else
                  segment = bond.n_b.segment
              @selectCloseNode(segment)
              @currHitItem = segment

          else if hitResult == null
            if @currHitItem and @currHitItem.type
              @deselectBond(@currHitItem)
              @currHitItem = undefined
            else if @currHitItem
              @deselectCloseNode(@currHitItem)
              @currHitItem = undefined

      tool.onMouseDown = (e) =>
        if e.event.which == 3
          e.event.preventDefault()
          e.event.stopImmediatePropagation()
          return false
        if @currHitItem and @currHitItem.type
          @deselectBond(@currHitItem)
          @currHitItem = undefined
        else if @currHitItem
          @deselectCloseNode(@currHitItem)
          @currHitItem = undefined
        hitResult = @project.hitTest(e.point, @hitOptions)
        ##################
        # moving a label #
        ##################
        if hitResult and hitResult.type == "fill"
          @downAtom = hitResult.item
          #@cancelDrawing = true
          return

        if hitResult and hitResult.type == "segment"
          bond = hitResult.item
          if bond.bondType and bond.bondType == "aux"
            bond = bond.mainBond
          seg1 = if bond.n_a then bond.n_a.segment else bond.segments[0]
          seg2 = if bond.n_b then bond.n_b.segment else bond.segments[1]

          if e.point.getDistance(seg1.point, true) - e.point.getDistance(seg2.point, true) < 0
            closePoint = seg1.point
            farPoint = seg2.point
            if bond.n_a
              @closeNode = bond.n_a
          else
            closePoint = seg2.point
            farPoint = seg1.point
            if bond.n_b
              @closeNode = bond.n_b
          @mDownPoint =
            point: closePoint
            pairPoint: farPoint
            molecule: bond.molecule
            bond: bond
            hitResult: hitResult
        else if hitResult and hitResult.type == "stroke"
          bond = hitResult.item
          if bond.bondType and bond.bondType == "aux"
            bond = bond.mainBond
          @mDownPoint =
            molecule: bond.molecule
            bond: bond
            hitResult: hitResult

      @dragLabel = (e) ->
        if @downAtom
          pos = new @Point
            x: @downAtom.point.x
            y: @downAtom.point.y - 3.5
          @downAtom.point.x = e.point.x
          @downAtom.point.y = e.point.y + 3.5
          @downAtom.rect.position = @downAtom.bounds.center
          @updateBonds(@downAtom.connections, pos, e.point)

      @moveMolecule = (e) ->
        if @moveToCoords is undefined
          @moveToCoords =
            init: @mDownPoint.molecule.bounds.center
            toCoor: e.point
          @mDownPoint.molecule.translate(e.delta)
        else
          @mDownPoint.molecule.translate(e.delta)
          @moveToCoords.toCoor = @mDownPoint.molecule.bounds.center
        @cancelDrawing = true

      @rotateMolecule = (e) ->
        if @mDownPoint.hitResult.type == "segment"
          norm1 = new @Point
            x: e.point.x - @mDownPoint.molecule.position.x
            y: e.point.y - @mDownPoint.molecule.position.y
          norm2 = new @Point
            x: @mDownPoint.point.x - @mDownPoint.molecule.position.x
            y: @mDownPoint.point.y - @mDownPoint.molecule.position.y
          diff = norm1.angle - norm2.angle
          if @rotaMolecule is undefined
            @rotaMolecule =
              molecule: @mDownPoint.molecule
              initPoint: norm2
              lastPoint: norm1
              center: @mDownPoint.molecule.position
            @mDownPoint.molecule.rotate(diff, @rotaMolecule.center)
          else
            @rotaMolecule.lastPoint = norm1
            @mDownPoint.molecule.rotate(diff, @rotaMolecule.center)
          ####################################
          # anti-rotate labels ###############
          ####################################
          i = 0
          l = @mDownPoint.molecule.children.length
          while i < l
            child = @mDownPoint.molecule.children[i]
            if child.dType and child.dType == 'label'
              child.rotate(-diff)
            i++
          @cancelDrawing = true

      tool.onMouseDrag = (e) =>
        @cancelDrawing = true
        if @targetPoint then @deselectCloseNode(@targetPoint.segment)
        @tempHit = @targetPoint = @tempPath = undefined
        ##################
        # moving a label #
        ##################
        if e.modifiers.shift == true and @downAtom
          @dragLabel(e)
          return

        if @mDownPoint
          hitResult = @project.hitTest(e.point, @hitOptions)
          #####################
          # rotate a molecule #
          #####################
          if e.modifiers.option == true and @mDownPoint.hitResult.type == "segment"
            @rotateMolecule(e)
            return

          #####################
          # moving a molecule #
          #####################
          if @mDownPoint.hitResult.type == "stroke"
            @moveMolecule(e)
            return
          else if @mDownPoint and @mDownPoint.hitResult.type == "stroke"
            @cancelDrawing = true
            return

          ##################
          # moving an atom #
          ##################
          if e.modifiers.shift == true
            if @closeNode
              if @closeNode.connections.length > 0
                conns = []
                i = 0
                l = @closeNode.connections.length
                while i < l
                  conns.push @closeNode.connections[i]
                  i++
                conns.push @mDownPoint.bond
                @updateBonds(conns, @closeNode.segment.point, e.point)
              else
              # TODO
            else
              @closeNode.segment.point = e.point

            return
          #########################################################
          # dragging joins with another bond starting from a bond #
          #########################################################
          if hitResult and hitResult.type == "segment"
            closePoint = hitResult.segment.point
            @tempPath = new @Path @getBondOptions([@mDownPoint.point, closePoint])
            @tempPath.molecule = @mDownPoint.molecule
            @tempHit =
              item: hitResult.item
              point: closePoint
            @tempPath.removeOnDrag()
            @cancelDrawing = true
            return
          ########################################
          # freely dragging starting from a bond #
          ########################################
          @drawBond(e)
        else
          @cancelDrawing = true

      @drawBond = (e)->
        dx = @mDownPoint.point.x - @mDownPoint.pairPoint.x
        dy =  @mDownPoint.point.y - @mDownPoint.pairPoint.y
        theta = Math.atan2(dy, dx)

        dx1 = e.point.x - @mDownPoint.point.x
        dy1 = e.point.y - @mDownPoint.point.y
        theta1 = Math.atan2(dy1, dx1)

        if e.modifiers.control == false
          multi = Math.floor(theta1 / (Math.PI / 12))
          phi = (Math.PI / 12) * multi
        else
          phi = theta1
        if theta > Math.PI then theta -= Math.PI
        if theta < -1*Math.PI then theta += Math.PI
        dx1 = Math.cos(phi) * @bondLength
        dy1 = Math.sin(phi) * @bondLength
        lastPoint = new @Point
          x: @mDownPoint.point.x + dx1
          y: @mDownPoint.point.y + dy1
        tempHitResult = @project.hitTest(lastPoint, @altHitOptions)
        if tempHitResult and tempHitResult.item
          @tempHit =
            item: tempHitResult.item
            point: lastPoint
        @tempPath = new @Path @getBondOptions([@mDownPoint.point, lastPoint])
        @tempPath.removeOnDrag()
        @cancelDrawing = true

      tool.onMouseUp = (e) =>
        if @cancelDrawing is undefined
          eventPoint = e.point
          if @targetPoint then eventPoint = @targetPoint
          hitResult = @project.hitTest(eventPoint, @hitOptions)
          if @stateManager.getCurrentState()
            @stateManager.getCurrentState().mouseUp(e, hitResult)
          else @doMouseUp(e, hitResult)
        #----------------------------------------------------------------------------
        # connects the last bond made while draging to the hit bond when mouse down #
        #----------------------------------------------------------------------------
        else if @tempPath
          @mDownPoint.molecule.addChild(@tempPath)
          @tempPath.dType = 'bond'
          @tempPath.molecule = @mDownPoint.molecule
          @connect(@mDownPoint.bond, @tempPath, @mDownPoint.point)
          @redrawMultipleBonds(@mDownPoint.bond)

          if @tempHit
            @connect(@tempHit.item, @tempPath, @tempHit.point, "alt")
            @redrawMultipleBonds(@tempHit.item)
          if @tempHit and @isTheParent(@mDownPoint.molecule, @tempHit.item) == false
            @mergeIn(@mDownPoint.molecule, @tempHit.item.molecule)
        else if @moveToCoords
            action = new MoveMoleculeAction(this, @mDownPoint.molecule, @moveToCoords.init, @moveToCoords.toCoor)
            @historyManager.addAction action
        else if @rotaMolecule
            action = new RotateMoleculeAction(this, @mDownPoint.molecule, @rotaMolecule.initPoint, @rotaMolecule.lastPoint, @rotaMolecule.center)
            @historyManager.addAction(action)

        @rotaMolecule = @moveToCoords = @closeNode = @downAtom = @tempPath = @tempHit = @cancelDrawing = @mDownPoint = undefined

      @doMouseUp = (e, hitResult) ->
        if e.event.which == 3
          e.event.preventDefault()
          e.event.stopImmediatePropagation()
          return false
        if hitResult and (hitResult.type == "segment" or hitResult.type == "fill")
          if hitResult.item.dType
           if hitResult.item.dType == "bond" then bond = hitResult.item
           else if hitResult.item.dType == "label" then bond = hitResult.item.connections[0] else return
          else return
          if bond.bondType and bond.bondType == "aux"
            bond = bond.mainBond
          point1 = (if bond.n_a then bond.n_a.point else bond.segments[0].point)
          point2 = (if bond.n_b then bond.n_b.point else bond.segments[1].point)
          if point2 is undefined then console.log bond.n_b
          eventPoint = if hitResult.segment then hitResult.segment.point else new @Point(hitResult.item.point.x, hitResult.item.point.y-3.5)
          if eventPoint.getDistance(point1, true) - eventPoint.getDistance(point2, true) < 0
            closePoint = point1
            farPoint = point2
            if bond.n_a then closeNode = bond.n_a
            if bond.n_b then farNode = bond.n_b
          else
            closePoint = point2
            farPoint = point1
            if bond.n_b then closeNode = bond.n_b
            if bond.n_a then farNode = bond.n_a

          dx = closePoint.x - farPoint.x
          dy =  closePoint.y - farPoint.y
          theta = Math.atan2(dy, dx)

          if theta > Math.PI then theta -= Math.PI
          if theta < -1*Math.PI then theta += Math.PI
          phi = theta + 60 * Math.PI / 180
          dx1 = Math.cos(phi) * @bondLength
          dy1 = Math.sin(phi) * @bondLength

          @lastPoint = new @Point
            x: closePoint.x + dx1
            y: closePoint.y + dy1

          if farNode and farNode.connections.length == 1 and closeNode and closeNode.connections.length == 0
            #-----------------------------
            # calculate the trans point #
            #-----------------------------
            phi = theta - 60 * Math.PI / 180
            dx1 = Math.cos(phi) * @bondLength
            dy1 = Math.sin(phi) * @bondLength

            lastPoint2 = new @Point
              x: closePoint.x + dx1
              y: closePoint.y + dy1

            thirdBond = farNode.connections[0]
            if farPoint.getDistance(thirdBond.segments[0].point, true) - farPoint.getDistance(thirdBond.segments[1].point, true) < 0
              farThirdPoint = thirdBond.segments[1].point
            else
              farThirdPoint = thirdBond.segments[0].point
            if farThirdPoint.getDistance(@lastPoint, true) - farThirdPoint.getDistance(lastPoint2, true) < 0
              @lastPoint = lastPoint2

          else if @targetPoint is undefined and closeNode and closeNode.connections.length > 0
            conns = []
            i = 0
            l = closeNode.connections.length
            while i < l
              conns.push closeNode.connections[i]
              i++
            conns.push bond

            points = []
            i = 0
            l = conns.length
            while i < l
              iBond = conns[i]
              iPoint1 = if iBond.n_a then iBond.n_a.segment.point else iBond.segments[0].point
              iPoint2 = if iBond.n_b then iBond.n_b.segment.point else iBond.segments[1].point
              if closePoint.getDistance(iPoint1, true) - closePoint.getDistance(iPoint2, true) < 0
                iFarPoint = iPoint2
              else
                iFarPoint = iPoint1
              point = new Point
                x: iFarPoint.x - closePoint.x
                y: iFarPoint.y - closePoint.y
              if point.angle < 0 then point.angle = point.angle + 360
              points.push point
              i++

            points.sort (p1, p2) =>
              p1.angle - p2.angle

            result = []
            result[0] = 0
            i = 1
            l = points.length
            while i < l
              x = points[i].angle - points[i-1].angle
              if result[0] < x
                result[0] = x
                result[1] = points[i-1]
              i++
            x = 360 - points[points.length-1].angle + points[0].angle
            if result[0] < x
              result[0] = x
              result[1] = points[points.length-1]

            angle = result[1].angle + result[0]/2
            if angle > 360 then angle -= 360

            point = new Point
              length: @bondLength
              angle: angle

            @lastPoint = new Point
              x: point.x + closePoint.x
              y: point.y + closePoint.y

          if bond.molecule
            molecule = bond.molecule
            testHitResult = @project.hitTest(@lastPoint, @altHitOptions)
            if testHitResult and testHitResult.type == "segment" then @lastPoint = testHitResult.segment.point
            newBond = new @Path @getBondOptions([closePoint, @lastPoint])
            newBond.dType = 'bond'
            newBond.molecule = molecule
            molecule.addChild(newBond)
            @connect(bond, newBond, eventPoint)
            if testHitResult and testHitResult.type == "segment"
              @connect(testHitResult.item, newBond, testHitResult.point, "alt")
              if @isTheParent(newBond.molecule, testHitResult.item) == false
                @mergeIn(newBond.molecule, testHitResult.item.molecule)

            if @targetPoint then @deselectCloseNode(@targetPoint.segment)
            @targetPoint = new Point
              x: @lastPoint.x
              y: @lastPoint.y
            hitResult = @project.hitTest(@targetPoint, @hitOptions)
            if testHitResult
              @targetPoint = undefined
            else if hitResult and hitResult.segment
              @selectCloseNode(hitResult.segment)
              @targetPoint.segment = hitResult.segment
            @updateBonds(newBond.n_a.connections.concat([newBond]), newBond.n_a.point)
            action = new NewBondAction(this, molecule, newBond)
            @historyManager.addAction action
            newBond.bondOrder = 1
            newBond.stereo = 'none'
            newBond

        else if hitResult and hitResult.type == 'stroke'
          if hitResult.item and hitResult.item.dType == "bond"
            bond = hitResult.item
            if bond.bondOrder < 3 then @mkDoubleBond(e, bond)

        else
          phi = 30 * Math.PI / 180
          dx1 = Math.cos(phi) * @bondLength
          dy1 = Math.sin(phi) * @bondLength

          @lastPoint = new @Point
            x: e.point.x + dx1
            y: e.point.y - dy1

          initBond = new @Path @getBondOptions([e.point, @lastPoint])
          initBond.dType = 'bond'
          initMolecule = new @Group(initBond)
          initMolecule.children[0].molecule = initMolecule
          initBond.n_a = new BondNode initBond.segments[0], initBond.segments[0].point, initBond
          initBond.n_b = new BondNode initBond.segments[1], initBond.segments[1].point, initBond
          initMolecule.bonds = [initBond]
          initMolecule.labels = []
          initMolecule.nodes = [initBond.n_a, initBond.n_b]
          @lastPoint.molecule = initMolecule
          action = new NewBondAction this, initMolecule, initBond
          @historyManager.addAction action
          @checkMolecule initBond.molecule

          if @targetPoint then @deselectCloseNode(@targetPoint.segment)
          @targetPoint = new Point
            x: @lastPoint.x
            y: @lastPoint.y
          hitResult = @project.hitTest(@targetPoint, @hitOptions)
          if hitResult and hitResult.segment
            @selectCloseNode(hitResult.segment)
            @targetPoint.segment = hitResult.segment
          initBond.bondOrder = 1
          initBond.stereo = 'none'
          initBond


      @isTheParent = (group, item) ->
        if group.children
          result = false
          i = 0
          l = group.children.length
          while i < l
            if group.children[i].id == item.id
              result = true
              i = l - 1
            i++
        result

      @isDirectlyConnected = (bond1, bond2) ->
        result = false
        isConnectedAtNode = (node) ->
          connected = false
          i = 0
          l = node.connections.length
          while i < l
            if node.connections[i].id == bond1.id
              connected = node
              i = l - 1
            i++
          connected
        if bond2.n_a then result = isConnectedAtNode(bond2.n_a)
        if bond2.n_b and result == false then result = isConnectedAtNode(bond2.n_b)
        result

      ###################################
      # merges molecule2 into molecule1 #
      ###################################
      @mergeIn = (molecule1, molecule2) ->
        i = 0
        l = molecule2.children.length
        while i < l
          molecule2.children[i].molecule = molecule1
          i++
        molecule1.addChildren(molecule2.children)
        molecule2.removeChildren()
        #molecule2.remove()
        true

      @checkMolecule = (molecule) ->
        molecules = []
        labels = []
        bonds = []
        nodes = []
        _checkMolecule = (molecule) =>
          if molecule.children.length == 0 then return
          tempArr = []
          tempArr.push molecule.children[0]
          if molecule.children[0].dType == 'bond' then bonds.push molecule.children[0]
          if molecule.children[0].dType == 'label' then labels.push molecule.children[0]
          if molecule.children[0].multiple
            j = 0
            jl = molecule.children[0].multiple.length
            while j < jl
              tempArr.push molecule.children[0].multiple[j]
              @redrawMultipleBonds(molecule.children[0])
              j++
          i = 0
          l = tempArr.length
          while i < l
            if tempArr[i].n_a
              connections = tempArr[i].n_a.connections.concat(tempArr[i].n_b.connections)
              if tempArr[i].n_a.labels and tempArr[i].n_a.labels.atom
                connections.push tempArr[i].n_a.labels.atom
                connections.push tempArr[i].n_a.labels.atom.rect
              if tempArr[i].n_b.labels and tempArr[i].n_b.labels.atom
                connections.push tempArr[i].n_b.labels.atom
                connections.push tempArr[i].n_b.labels.atom.rect
              ii = 0
              ll = connections.length
              while ii < ll
                if tempArr.indexOf(connections[ii]) == -1
                  tempArr.push connections[ii]
                  if connections[ii].multiple
                    j = 0
                    jl = connections[ii].multiple.length
                    while j < jl
                      tempArr.push connections[ii].multiple[j]
                      @redrawMultipleBonds(connections[ii])
                      j++
                ii++
              l = tempArr.length

              if tempArr[i].dType == 'bond' and bonds.indexOf(tempArr[i]) == -1 then bonds.push tempArr[i]
              if nodes.length
                result =
                  n_a: false
                  n_b: false
                j = 0
                jl = nodes.length
                while j < jl
                  if nodes[j].ref == tempArr[i].n_a.ref then result.n_a = true
                  if nodes[j].ref == tempArr[i].n_b.ref then result.n_b = true
                  j++
                if result.n_a is false then nodes.push tempArr[i].n_a
                if result.n_b is false then nodes.push tempArr[i].n_b
              else
                nodes = [tempArr[i].n_a, tempArr[i].n_b]

            else if tempArr[i].dType == 'label'
              labels.push tempArr[i]

            i++
          if tempArr.length < molecule.children.length
            restArr = []
            i = 0
            l = molecule.children.length
            while i < l
              if tempArr.indexOf(molecule.children[i]) == -1
                restArr.push molecule.children[i]
              i++
            if restArr.length > 0
              restMolecule = new @Group(restArr)
              _checkMolecule(restMolecule)
          molecule.bonds = bonds
          molecule.labels = labels
          molecule.nodes = nodes unless molecule.children.length == 1
          molecule.children = tempArr

          i = 0
          l = molecule.children.length
          while i < l
            molecule.children[i].molecule = molecule
            i++
          molecules.push molecule
          true

        _checkMolecule(molecule)
        molecules

      @molLayer = @project.activeLayer
      @layers = @project.layers
      this

    _ = c.Canvas:: = paper

    this

  ) ChemCanvas, ChemCanvas.pencil, ChemCanvas.items, Math, ChemCanvas.ELEMENTS, ChemCanvas.io
  ChemCanvas

