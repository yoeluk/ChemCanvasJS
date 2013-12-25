(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  (function() {
    var BondNode, Delete, DeleteBondAction, Element, Exporter, HistoryManager, IO, MOLInterpreter, MouseUpAction, MoveMoleculeAction, NewAtomLabel, NewAtomLabelAction, NewBondAction, NewDoubleBond, NewRing3, NewRing4, NewRing5, NewRing6, NewRing7, NewRing8, NewRingAction, NewSingleBond, NewTripleBond, RotateMoleculeAction, StateManager, mobBrowser, _Action, _State;
    paper.install(this);
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      mobBrowser = true;
    } else {
      mobBrowser = false;
    }
    window.ChemCanvas = (function() {
      "use strict";

      var VERSION, c;
      c = {};
      c.items = {};
      c.calcs = {};
      c.io = {};
      c.pencil = {
        events: {},
        states: {}
      };
      VERSION = "0.9";
      c.version = function() {
        return VERSION;
      };
      return c;
    })();
    Element = (function() {

      function Element(symbol, name, atomicNumber, fillValence, color, valence, atomicMass, electronicConf) {
        this.symbol = symbol;
        this.name = name;
        this.atomicNumber = atomicNumber;
        this.fillValence = fillValence;
        this.color = color;
        this.valence = valence;
        this.atomicMass = atomicMass;
        this.electronicConf = electronicConf;
      }

      return Element;

    })();
    ChemCanvas.ELEMENTS = (function() {
      "use strict";

      var A;
      A = {};
      A.H = new Element('H', 'Hydrogen', 1, false, '#808080', 1, 1.0079, '1s1');
      A.He = new Element('He', 'Helium', 2, false, '#849B9B', 0, 4.0026, '1s2');
      A.Li = new Element('Li', 'Lithium', 3, false, '#C87EFA', 1, 6.941, '1s2&middot;2s1');
      A.Be = new Element('Be', 'Beryllium', 4, false, '#82AB00', 2, 9.01218, '1s2&middot;2s2');
      A.B = new Element('B', 'Boron', 5, true, '#F090A0', 3, 10.81, '1s2&middot;2s2&middot;2p1');
      A.C = new Element('C', 'Carbon', 6, true, 'null', 4, 12.011, '1s2&middot;2s2&middot;2p2');
      A.N = new Element('N', 'Nitrogen', 7, true, '#304FF7', 3, 14.0067, '1s2&middot;2s2&middot;2p3');
      A.O = new Element('O', 'Oxygen', 8, true, '#FF0D0D', 2, 15.9994, '1s2&middot;2s2&middot;2p4');
      A.F = new Element('F', 'Fluorine', 9, true, '#228B22', 1, 18.998403, '1s2&middot;2s2&middot;2p5');
      A.Ne = new Element('Ne', 'Neon', 10, false, '#7B9CA8', 0, 20.179, '1s2&middot;2s2&middot;2p6');
      A.Na = new Element('Na', 'Sodium', 11, false, '#AB5CF2', 1, 22.98977, '[Ne]3s1');
      A.Mg = new Element('Mg', 'Magnesium', 12, false, '#61B400', 0, 24.305, '[Ne]3s2');
      A.Al = new Element('Al', 'Aluminum', 13, false, '#A79191', 0, 26.98154, '[Ne]3s2&middot;3p1');
      A.Si = new Element('Si', 'Silicon', 14, true, '#B09276', 4, 28.0855, '[Ne]3s2&middot;3p2');
      A.P = new Element('P', 'Phosphorus', 15, true, '#FF8000', 3, 30.97376, '[Ne]3s2&middot;3p3');
      A.S = new Element('S', 'Sulfur', 16, true, '#FFC832', 2, 32.06, '[Ne]3s2&middot;3p4');
      A.Cl = new Element('Cl', 'Chlorine', 17, true, '#1DC51D', 1, 35.453, '[Ne]3s2&middot;3p5');
      A.Ar = new Element('Ar', 'Erbium', 68, false, '#63A2B0', 0, 39.948, '[Ne]3s2&middot;3p6');
      A.K = new Element('K', 'Potassium', 19, false, '#8F40D4', 0, 39.0983, '[Ar]4s1');
      A.Ca = new Element('Ca', 'Calcium', 20, false, '#2FC300', 0, 40.08, '[Ar]4s2');
      A.Sc = new Element('Sc', 'Scandium', 21, false, '#969696', 0, 44.9559, '[Ar]3d1&middot;4s2');
      A.Ti = new Element('Ti', 'Titanium', 22, false, '#94969A', 1, 47.9, '[Ar]3d2&middot;4s2');
      A.V = new Element('V', 'Vanadium', 23, false, '#96969A', 1, 50.9415, '[Ar]3d3&middot;4s2');
      A.Cr = new Element('Cr', 'Chromium', 24, false, '#8796C3', 2, 51.996, '[Ar]3d5&middot;4s1');
      A.Mn = new Element('Mn', 'Manganese', 25, false, '#9C7AC7', 3, 54.938, '[Ar]3d5&middot;4s2');
      A.Fe = new Element('Fe', 'Iron', 26, false, '#E06633', 2, 55.847, '[Ar]3d6&middot;4s2');
      A.Co = new Element('Co', 'Cobalt', 27, false, '#DB8293', 1, 58.9332, '[Ar]3d7&middot;4s2');
      A.Ni = new Element('Ni', 'Nickel', 28, false, '#45B645', 1, 58.7, '[Ar]3d8&middot;4s2');
      A.Cu = new Element('Cu', 'Copper', 29, false, '#C78033', 0, 63.546, '[Ar]3d10&middot;4s1');
      A.Zn = new Element('Zn', 'Zinc', 30, false, '#7D80B0', 0, 65.38, '[Ar]3d10&middot;4s2');
      A.Ga = new Element('Ga', 'Gallium', 31, false, '#BD8C8C', 0, 69.72, '[Ar]3d10&middot;4s2&middot;4p1');
      A.Ge = new Element('Ge', 'Germanium', 32, false, '#668F8F', 4, 72.59, '[Ar]3d10&middot;4s2&middot;4p2');
      A.As = new Element('As', 'Einsteinium', 99, false, '#BD80E3', 0, 74.9216, '[Ar]3d10&middot;4s2&middot;4p3');
      A.Se = new Element('Se', 'Selenium', 34, true, '#E28F00', 2, 78.96, '[Ar]3d10&middot;4s2&middot;4p4');
      A.Br = new Element('Br', 'Bromine', 35, true, '#A62929', 1, 79.904, '[Ar]3d10&middot;4s2&middot;4p5');
      A.Kr = new Element('Kr', 'Krypton', 36, false, '#53A6BC', 0, 83.8, '[Ar]3d10&middot;4s2&middot;4p6');
      A.Rb = new Element('Rb', 'Rubidium', 37, false, '#702EB0', 0, 85.4678, '[Kr]5s1');
      A.Sr = new Element('Sr', 'Strontium', 38, false, '#00D000', 0, 87.62, '[Kr]5s2');
      A.Y = new Element('Y', 'Yttrium', 39, false, '#5FA4A4', 0, 88.9059, '[Kr]4d1&middot;5s2');
      A.Zr = new Element('Zr', 'Zirconium', 40, false, '#6BA2A2', 0, 91.22, '[Kr]4d2&middot;5s2');
      A.Nb = new Element('Nb', 'Niobium', 41, false, '#61A4A9', 1, 92.9064, '[Kr]4d4&middot;5s1');
      A.Mo = new Element('Mo', 'Molybdenum', 42, false, '#4EA9A9', 2, 95.94, '[Kr]4d5&middot;5s1');
      A.Tc = new Element('Tc', 'Technetium', 43, false, '#3B9E9E', 3, 98, '[Kr]4d5&middot;5s2');
      A.Ru = new Element('Ru', 'Ruthenium', 44, false, '#248F8F', 2, 101.07, '[Kr]4d7&middot;5s1');
      A.Rh = new Element('Rh', 'Rhodium', 45, false, '#0A7D8C', 1, 102.9055, '[Kr]4d8&middot;5s1');
      A.Pd = new Element('Pd', 'Palladium', 46, false, '#006985', 0, 106.4, '[Kr]4d10');
      A.Ag = new Element('Ag', 'Silver', 47, false, '#969696', 0, 107.868, '[Kr]4d10&middot;5s1');
      A.Cd = new Element('Cd', 'Cadmium', 48, false, '#AE9462', 0, 112.41, '[Kr]4d10&middot;5s2');
      A.In = new Element('In', 'Indium', 49, false, '#A67573', 0, 114.82, '[Kr]4d10&middot;5s2&middot;5p1');
      A.Sn = new Element('Sn', 'Tin', 50, false, '#668080', 4, 118.69, '[Kr]4d10&middot;5s2&middot;5p2');
      A.Sb = new Element('Sb', 'Antimony', 51, false, '#9E63B5', 3, 121.75, '[Kr]4d10&middot;5s2&middot;5p3');
      A.Te = new Element('Te', 'Tellurium', 52, true, '#D47A00', 2, 127.6, '[Kr]4d10&middot;5s2&middot;5p4');
      A.I = new Element('I', 'Iodine', 53, true, '#940094', 1, 126.9045, '[Kr]4d10&middot;5s2&middot;5p5');
      A.Xe = new Element('Xe', 'Xenon', 54, false, '#429EB0', 0, 131.3, '[Kr]4d10&middot;5s2&middot;5p6');
      A.Cs = new Element('Cs', 'Cesium', 55, false, '#57178F', 0, 132.9054, '[Xe]6s1');
      A.Ba = new Element('Ba', 'Barium', 56, false, '#00C900', 0, 137.33, '[Xe]6s2');
      A.La = new Element('La', 'Lanthanum', 57, false, '#57A4C5', 0, 138.9055, '[Xe]5d1&middot;6s2');
      A.Ce = new Element('Ce', 'Cerium', 58, false, '#989877', 0, 140.12, '[Xe]4f1&middot;5d1&middot;6s2');
      A.Pr = new Element('Pr', 'Praseodymium', 59, false, '#869D7B', 0, 140.9077, '[Xe]4f3&middot;6s2');
      A.Nd = new Element('Nd', 'Neodymium', 60, false, '#7DA07D', 0, 144.24, '[Xe]4f4&middot;6s2');
      A.Pm = new Element('Pm', 'Promethium', 61, false, '#69A581', 0, 145, '[Xe]4f5&middot;6s2');
      A.Sm = new Element('Sm', 'Samarium', 62, false, '#5EA883', 0, 150.4, '[Xe]4f6&middot;6s2');
      A.Eu = new Element('Eu', 'Europium', 63, false, '#43B089', 0, 153, '[Xe]4f7&middot;6s2');
      A.Gd = new Element('Gd', 'Gadolinium', 64, false, '#31B48D', 0, 157.25, '[Xe]4f7&middot;5d1&middot;6s2');
      A.Tb = new Element('Tb', 'Terbium', 65, false, '#23B890', 0, 158.9254, '[Xe]4f9&middot;6s2');
      A.Dy = new Element('Dy', 'Dysprosium', 66, false, '#17BB92', 0, 162.5, '[Xe]4f10&middot;6s2');
      A.Ho = new Element('Ho', 'Holmium', 67, false, '#00C578', 0, 164.9304, '[Xe]4f11&middot;6s2');
      A.Er = new Element('Er', 'Erbium', 68, false, '#00C765', 0, 167.26, '[Xe]4f12&middot;6s2');
      A.Tm = new Element('Tm', 'Thulium', 69, false, '#00C94E', 0, 168.9342, '[Xe]4f13&middot;6s2');
      A.Yb = new Element('Yb', 'Ytterbium', 70, false, '#00BF38', 0, 173.04, '[Xe]4f14&middot;6s2');
      A.Lu = new Element('Lu', 'Lutetium', 71, false, '#00AB24', 0, 174.967, '[Xe]4f14&middot;5d1&middot;6s2');
      A.Hf = new Element('Hf', 'Hafnium', 72, false, '#42A8DC', 0, 178.49, '[Xe]4f14&middot;5d2&middot;6s2');
      A.Ta = new Element('Ta', 'Tantalum', 73, false, '#4BA2F9', 1, 180.9479, '[Xe]4f14&middot;5d3&middot;6s2');
      A.W = new Element('W', 'Tungsten', 74, false, '#2194D6', 2, 183.85, '[Xe]4f14&middot;5d4&middot;6s2');
      A.Re = new Element('Re', 'Rhenium', 75, false, '#267DAB', 3, 186.207, '[Xe]4f14&middot;5d5&middot;6s2');
      A.Os = new Element('Os', 'Osmium', 76, false, '#266696', 2, 190.2, '[Xe]4f14&middot;5d6&middot;6s2');
      A.Ir = new Element('Ir', 'Iridium', 77, false, '#175487', 3, 192.22, '[Xe]4f14&middot;5d7&middot;6s2');
      A.Pt = new Element('Pt', 'Platinum', 78, false, '#9595A0', 0, 195.09, '[Xe]4f14&middot;5d9&middot;6s1');
      A.Au = new Element('Au', 'Gold', 79, false, '#B9981A', 1, 196.9665, '[Xe]4f14&middot;5d10&middot;6s1');
      A.Hg = new Element('Hg', 'Mercury', 80, false, '#9595A9', 0, 200.59, '[Xe]4f14&middot;5d10&middot;6s2');
      A.Tl = new Element('Tl', 'Thallium', 81, false, '#A6544D', 0, 204.37, '[Xe]4f14&middot;5d10&middot;6s2&middot;6p1');
      A.Pb = new Element('Pb', 'Lead', 82, false, '#575961', 4, 207.2, '[Xe]4f14&middot;5d10&middot;6s2&middot;6p2');
      A.Bi = new Element('Bi', 'Bismuth', 83, false, '#9E4FB5', 3, 208.9804, '[Xe]4f14&middot;5d10&middot;6s2&middot;6p3');
      A.Po = new Element('Po', 'Polonium', 84, false, '#AB5C00', 2, 209, '[Xe]4f14&middot;5d10&middot;6s2&middot;6p4');
      A.At = new Element('At', 'Astatine', 85, true, '#754F45', 1, 210, '[Xe]4f14&middot;5d10&middot;6s2&middot;6p5');
      A.Rn = new Element('Rn', 'Radon', 86, false, '#428296', 0, 222, '[Xe]4f14&middot;5d10&middot;6s2&middot;6p6');
      A.Fr = new Element('Fr', 'Francium', 87, false, '#420066', 0, 223, '[Rn]7s1');
      A.Ra = new Element('Ra', 'Radium', 88, false, '#007D00', 0, 226.0254, '[Rn]7s2');
      A.Ac = new Element('Ac', 'Actinium', 89, false, '#669CE4', 0, 227.0278, '[Rn]6d1&middot;7s2');
      A.Th = new Element('Th', 'Thorium', 90, false, '#00B8FC', 0, 232.0381, '[Rn]6d2&middot;7s2');
      A.Pa = new Element('Pa', 'Protactinium', 91, false, '#00A1FF', 0, 231.0359, '[Rn]5f2&middot;6d1&middot;7s2');
      A.U = new Element('U', 'Uranium', 92, false, '#008FFF', 0, 238.029, '[Rn]5f3&middot;6d1&middot;7s2');
      A.Np = new Element('Np', 'Neptunium', 93, false, '#0080FF', 0, 237.0482, '[Rn]5f4&middot;6d1&middot;7s2');
      A.Pu = new Element('Pu', 'Plutonium', 94, false, '#006BFF', 0, 244, '[Rn]5f6&middot;7s2');
      A.Am = new Element('Am', 'Americium', 95, false, '#545CF2', 0, 243, '[Rn]5f7&middot;7s2');
      A.Cm = new Element('Cm', 'Curium', 96, false, '#785CE3', 0, 247, '[Rn]5f7&middot;6d1&middot;7s2');
      A.Bk = new Element('Bk', 'Berkelium', 97, false, '#8A4FE3', 0, 247, '[Rn]5f9&middot;7s2');
      A.Cf = new Element('Cf', 'Californium', 98, false, '#A136D4', 0, 251, '[Rn]5f10&middot;7s2');
      A.Es = new Element('Es', 'Einsteinium', 99, false, '#B31FD4', 0, 252, '[Rn]5f11&middot;7s2');
      A.Fm = new Element('Fm', 'Fermium', 100, false, 'null', 0, 257, '[Rn]5f12&middot;7s2');
      A.Md = new Element('Md', 'Mendelevium', 101, false, 'null', 0, 258, '[Rn]5f13&middot;7s2');
      A.No = new Element('No', 'Nobelium', 102, false, 'null', 0, 259, '[Rn]5f14&middot;7s2');
      A.Lr = new Element('Lr', 'Lawrencium', 103, false, 'null', 0, 260, '[Rn]5f14&middot;6d1&middot;7s2');
      A.Rf = new Element('Rf', 'Rutherfordium', 104, false, '#42A8DC', 0, 261, '[Rn]5f14&middot;6d2&middot;7s2');
      A.Db = new Element('Db', 'Dubnium', 105, false, '#4BA2F9', 0, 262, '[Rn]5f14&middot;6d3&middot;7s2');
      A.Sg = new Element('Sg', 'Seaborgium', 106, false, '#2194D6', 0, 266, '[Rn]5f14&middot;6d4&middot;7s2');
      A.Bh = new Element('Bh', 'Bohrium', 107, false, '#267DAB', 0, 264, '[Rn]5f14&middot;6d5&middot;7s2');
      A.Hs = new Element('Hs', 'Hassium', 108, false, '#266696', 0, 277, '[Rn]5f14&middot;6d6&middot;7s2');
      A.Mt = new Element('Mt', 'Meitnerium', 109, false, '#175487', 0, 268, '[Rn]5f14&middot;6d7&middot;7s2');
      A.Ds = new Element('Ds', 'Darmstadtium', 110, false, '#9595A0', 0, 281, '[Rn]5f14&middot;6d9&middot;7s1');
      A.Rg = new Element('Rg', 'Roentgenium', 111, false, '#B9981A', 0, 272, '[Rn]5f14&middot;6d9&middot;7s2');
      A.Cn = new Element('Cn', 'Copernicium', 112, false, '#9595A9', 0, 285, '[Rn]5f14&middot;6d10&middot;7s2');
      A.Uut = new Element('Uut', 'Ununtrium', 113, false, '#000000', 0, 284, '[Rn]5f14&middot;6d10&middot;7s1');
      A.Uuq = new Element('Uuq', 'Ununquadium', 114, false, '#000000', 0, 289, '[Rn]5f14&middot;6d10&middot;7s2&middot;7p2');
      A.Uup = new Element('Uup', 'Ununpentium', 115, false, '#000000', 0, 288, '[Rn]5f14&middot;6d10&middot;7s2&middot;7p3');
      A.Uuh = new Element('Uuh', 'Ununhexium', 116, false, '#000000', 0, 292, '[Rn]5f14&middot;6d10&middot;7s2&middot;7p4');
      A.Uus = new Element('Uus', 'Ununseptium', 117, false, '#000000', 0, 291, '');
      A.Uuo = new Element('Uuo', 'Ununoctium', 118, false, '#000000', 0, 294, '');
      A.H.pyColor = "#E6E6E6";
      A.C.pyColor = "#33FF33";
      A.N.pyColor = "#3333FF";
      A.O.pyColor = "#FF4D4D";
      A.F.pyColor = "#B3FFFF";
      A.S.pyColor = "#E6C640";
      return A;
    })();
    IO = (function() {

      function IO() {}

      IO.prototype.fit = function(data, length, leftAlign) {
        var i, l, padding, size;
        size = data.length;
        padding = [];
        i = 0;
        l = length - size;
        while (i < l) {
          padding.push(" ");
          i++;
        }
        if (leftAlign) {
          return data + padding.join("");
        } else {
          return padding.join("") + data;
        }
      };

      return IO;

    })();
    Exporter = (function(_super) {

      __extends(Exporter, _super);

      function Exporter(sketcher) {
        this.sketcher = sketcher;
      }

      Exporter.prototype.canvasToSvg = function() {
        var XMLS, inp_xmls, svg,
          _this = this;
        svg = this.sketcher.project.exportSVG();
        XMLS = new XMLSerializer;
        inp_xmls = XMLS.serializeToString(svg);
        console.log(svg);
        return setTimeout(function() {
          return _this.svgToCanvas(svg, 200);
        });
      };

      Exporter.prototype.svgToCanvas = function(svg) {
        var i, l, molLayer,
          _this = this;
        i = 0;
        l = this.sketcher.layers.length;
        while (i < l) {
          this.sketcher.layers[i].remove();
          i++;
        }
        this.sketcher.molLayer = new this.sketcher.Layer();
        this.sketcher.molLayer.activate();
        this.sketcher.view.draw();
        molLayer = $($(svg).first().children()[0]);
        return $(molLayer.children()).each(function(i, mol) {
          var molecule;
          if ($(mol).children().length) {
            molecule = new _this.sketcher.Group();
            molecule.bonds = [];
            molecule.labels = [];
            molecule.nodes = [];
            $(mol).find("line, polygon").each(function(ii, bond) {
              var bondData, dBond, hitResult1, hitResult2, p1, p2;
              bondData = JSON.parse(bond.getAttribute("bData")) || void 0;
              if (bondData !== void 0) {
                p1 = new _this.sketcher.Point({
                  x: parseFloat(bondData.a1.x),
                  y: parseFloat(bondData.a1.y)
                });
                p2 = new _this.sketcher.Point({
                  x: parseFloat(bondData.a2.x),
                  y: parseFloat(bondData.a2.y)
                });
                hitResult1 = _this.sketcher.project.hitTest(p1, _this.sketcher.altHitOptions);
                hitResult2 = _this.sketcher.project.hitTest(p2, _this.sketcher.altHitOptions);
                dBond = new _this.sketcher.Path(_this.sketcher.getBondOptions([p1, p2]));
                dBond.dType = 'bond';
                dBond.n_a = new BondNode(dBond.segments[0], dBond.segments[0].point, dBond);
                dBond.n_b = new BondNode(dBond.segments[1], dBond.segments[1].point, dBond);
                dBond.molecule = molecule;
                molecule.addChild(dBond);
                molecule.bonds.push(dBond);
                molecule.nodes.push(dBond.n_a, dBond.n_b);
                if (hitResult1 && (hitResult1.type = 'segment' && hitResult1.item.dType === "bond")) {
                  _this.sketcher.connect(hitResult1.item, dBond, hitResult1.segment.point);
                }
                if (hitResult2 && hitResult2.item && hitResult2.item.dType === "bond") {
                  _this.sketcher.connect(hitResult2.item, dBond, hitResult2.segment.point, "alt");
                }
                if (bondData.bO === 2) {
                  _this.sketcher.mkDoubleBond("e", dBond);
                }
                if (bondData.bS === 1) {
                  return _this.sketcher.mkWedgedBond(dBond);
                } else if (bondData.bS === 6) {
                  return _this.sketcher.mkHashedBond(dBond);
                }
              }
            });
            return $(mol).find("text").each(function(ii, text) {
              var hitResult, p, textData;
              textData = JSON.parse(text.getAttribute("bData")) || void 0;
              if (textData !== void 0) {
                p = new _this.sketcher.Point({
                  x: parseFloat(textData.p.x),
                  y: parseFloat(textData.p.y)
                });
                hitResult = _this.sketcher.project.hitTest(p, _this.sketcher.altHitOptions);
                if (hitResult && (hitResult.type = 'segment')) {
                  return _this.sketcher.addUpdateLabel('e', hitResult, textData.c);
                }
              }
            });
          }
        });
      };

      return Exporter;

    })(IO);
    MOLInterpreter = (function(_super) {

      __extends(MOLInterpreter, _super);

      function MOLInterpreter(sketcher) {
        this.sketcher = sketcher;
        this.bonds = {};
        this.atoms = {};
        this.atom_count = 0;
        this.bond_count = 0;
        this.mol_lines = "";
        this.bondLength = this.sketcher.bondLength;
      }

      MOLInterpreter.prototype.addAtom = function(atom) {
        return this.atoms[atom.id] = atom;
      };

      MOLInterpreter.prototype.addBond = function(bond) {
        return this.bonds[bond.id] = bond;
      };

      MOLInterpreter.prototype.read = function(mol) {
        var atom, atom1, atom2, bond, bond1, factor, i, length, line, p1, p2;
        this.mol_lines = mol.split("\n");
        this.atom_count = parseInt(this.mol_lines[3].substr(0, 3));
        this.bond_count = parseInt(this.mol_lines[3].substr(3, 3));
        line = this.mol_lines[4 + this.atom_count];
        bond1 = {};
        bond1["a1"] = parseFloat(line.substr(0, 3));
        bond1["a2"] = parseFloat(line.substr(3, 3));
        line = this.mol_lines[3 + bond1.a1];
        atom1 = {};
        atom1["x"] = parseFloat(line.substr(0, 10));
        atom1["y"] = parseFloat(line.substr(10, 10));
        line = this.mol_lines[3 + bond1.a2];
        atom2 = {};
        atom2["x"] = parseFloat(line.substr(0, 10));
        atom2["y"] = parseFloat(line.substr(10, 10));
        p1 = new this.sketcher.Point({
          x: atom1.x,
          y: atom1.y
        });
        p2 = new this.sketcher.Point({
          x: atom2.x,
          y: atom2.y
        });
        length = p1.getDistance(p2);
        factor = this.bondLength / length;
        i = 1;
        while (i <= this.atom_count) {
          line = this.mol_lines[i + 3];
          atom = {};
          atom["id"] = i;
          atom["x"] = parseFloat(line.substr(0, 10)) * factor;
          atom["y"] = parseFloat(line.substr(10, 10)) * -factor;
          atom["z"] = parseFloat(line.substr(20, 10)) * factor;
          atom["label"] = line.substr(30, 4).replace(/(^\s*)|(\s*$)/g, "");
          atom["bonds"] = [];
          this.addAtom(atom);
          i++;
        }
        i = 1;
        while (i <= this.bond_count) {
          line = this.mol_lines[i + 3 + this.atom_count];
          bond = {};
          bond["id"] = line.substr(0, 6);
          bond["a1"] = this.atoms[parseFloat(line.substr(0, 3))];
          bond["a2"] = this.atoms[parseFloat(line.substr(3, 3))];
          bond["type"] = parseFloat(line.substr(6, 3));
          bond["stereo"] = parseInt(line.substr(9, 3));
          bond["drawn"] = false;
          this.addBond(bond);
          bond.a1.bonds.push(bond);
          bond.a2.bonds.push(bond);
          i++;
        }
        return this.drawMol();
      };

      MOLInterpreter.prototype.drawMol = function() {
        var draw, molecule,
          _this = this;
        if (this.sketcher.project.activeLayer !== this.sketcher.molLayer) {
          this.sketcher.molLayer.activate();
        }
        molecule = new this.sketcher.Group();
        molecule.bonds = [];
        molecule.labels = [];
        molecule.nodes = [];
        draw = function() {
          var atom, bond, firstBond, hitResult, i, iBond, j, l, point1, point_a, point_b, _results;
          i = 1;
          _results = [];
          while (i <= _this.atom_count) {
            atom = _this.atoms[i];
            j = 0;
            l = atom.bonds.length;
            while (j < l) {
              iBond = atom.bonds[j];
              if (!iBond.dBond) {
                point_a = new _this.sketcher.Point({
                  x: iBond.a1.x,
                  y: iBond.a1.y
                });
                point_b = new _this.sketcher.Point({
                  x: iBond.a2.x,
                  y: iBond.a2.y
                });
                bond = new _this.sketcher.Path(_this.sketcher.getBondOptions([point_a, point_b]));
                bond.n_a = new BondNode(bond.segments[0], bond.segments[0].point, bond);
                bond.n_b = new BondNode(bond.segments[1], bond.segments[1].point, bond);
                bond.bondOrder = iBond.type < 2 ? 1 : iBond.type < 3 ? 2 : iBond.type === 3 ? 3 : 1;
                bond.dType = 'bond';
                bond.molecule = molecule;
                molecule.addChild(bond);
                if (bond.bondOrder === 2) {
                  bond.bondOrder = 1;
                  _this.sketcher.mkDoubleBond('e', bond);
                } else if (bond.bondOrder === 3) {
                  bond.bondOrder = 1;
                  _this.sketcher.mkTripleBond('e', bond);
                }
                iBond.dBond = bond;
                if (bond.bondOrder === 1) {
                  if (iBond.stereo === 1) {
                    _this.sketcher.mkWedgedBond(bond);
                  } else if (iBond.stereo === 6) {
                    _this.sketcher.mkHashedBond(bond);
                  } else {
                    bond.stereo = 'none';
                  }
                }
              }
              j++;
            }
            firstBond = atom.bonds[0].dBond;
            point1 = new _this.sketcher.Point({
              x: atom.x,
              y: atom.y
            });
            j = 1;
            l = atom.bonds.length;
            while (j < l) {
              iBond = atom.bonds[j];
              bond = iBond.dBond;
              if (atom === iBond.a1) {
                _this.sketcher.connect(firstBond, bond, point1);
              } else {
                _this.sketcher.connect(firstBond, bond, point1, "alt");
              }
              j++;
            }
            if (atom.label !== "C") {
              hitResult = _this.sketcher.project.hitTest(point1, _this.sketcher.altHitOptions);
              if (hitResult !== void 0) {
                _this.sketcher.addUpdateLabel("e", hitResult, atom.label);
              }
            }
            _results.push(i++);
          }
          return _results;
        };
        draw();
        molecule.position = this.sketcher.view.center;
        return this.sketcher.view.draw();
      };

      MOLInterpreter.prototype.write = function(molecule) {
        var b, bo, i, ii, indexes, l, label, ll, mol, n, p, pos, stereo;
        mol = [];
        mol.push("MOL file exported from omgexams.com\nChemCanvas v0.9  http://www.omgexams.com\n[ Description ]\n");
        mol.push(this.fit(molecule.nodes.length.toString(), 3));
        mol.push(this.fit(molecule.bonds.length.toString(), 3));
        mol.push("  0  0  0  0  0  0  0  0999 V2000\n");
        pos = molecule.bounds.center;
        i = 0;
        l = molecule.nodes.length;
        while (i < l) {
          n = molecule.nodes[i];
          if (n.labels && n.labels.atom && n.labels.atom.ele) {
            label = n.labels.atom.ele.symbol;
          } else {
            label = 'C';
          }
          if (n.labels && n.labels.atom) {
            p = new this.sketcher.Point({
              x: n.labels.atom.point.x,
              y: n.labels.atom.point.y - 3.5
            });
          } else {
            p = n.point;
          }
          mol.push(this.fit(((p.x - pos.x) / this.bondLength).toFixed(4), 10));
          mol.push(this.fit((-(p.y - pos.y) / this.bondLength).toFixed(4), 10));
          mol.push(this.fit(0..toFixed(4), 10));
          mol.push(" ");
          mol.push(this.fit(label, 3, true));
          mol.push(" 0  0  0  0  0  0  0  0  0  0  0  0\n");
          i++;
        }
        i = 0;
        l = molecule.bonds.length;
        while (i < l) {
          b = molecule.bonds[i];
          stereo = 0;
          if (b.stereo === 'wedged') {
            stereo = 1;
          } else {
            if (b.stereo === 'hashed') {
              stereo = 6;
            }
          }
          indexes = {
            a1: 0,
            a2: 0
          };
          ii = 0;
          ll = molecule.nodes.length;
          while (ii < ll) {
            if (molecule.nodes[ii].ref === b.n_a.ref) {
              indexes.a1 = ii + 1;
            }
            if (molecule.nodes[ii].ref === b.n_b.ref) {
              indexes.a2 = ii + 1;
            }
            ii++;
          }
          bo = b.bondOrder ? b.bondOrder : 1;
          mol.push(this.fit(indexes.a1.toString(), 3));
          mol.push(this.fit(indexes.a2.toString(), 3));
          mol.push(this.fit(bo.toString(), 3));
          mol.push("  ");
          mol.push(stereo);
          mol.push("  0  0  0\n");
          i++;
        }
        mol.push("M  END");
        return mol.join("");
      };

      return MOLInterpreter;

    })(IO);
    BondNode = (function() {

      function BondNode(segment, point, bond) {
        this.segment = segment;
        this.point = point;
        this.connections = [];
        this.ref = "node_" + Math.floor(Math.random() * 1000000);
        this.parentBond = bond;
      }

      return BondNode;

    })();
    _Action = (function() {

      function _Action(sketcher) {
        this.sketcher = sketcher;
      }

      return _Action;

    })();
    MouseUpAction = (function(_super) {

      __extends(MouseUpAction, _super);

      function MouseUpAction(sketcher, e, hitResult) {
        this.e = e;
        this.hitResult = hitResult;
        MouseUpAction.__super__.constructor.call(this, sketcher);
        this.state = this.sketcher.stateManager.getCurrentState();
      }

      MouseUpAction.prototype.redo = function() {
        return this.state.mouseUp(this.e, this.hitResult);
      };

      MouseUpAction.prototype.undo = function() {};

      return MouseUpAction;

    })(_Action);
    MoveMoleculeAction = (function(_super) {

      __extends(MoveMoleculeAction, _super);

      function MoveMoleculeAction(sketcher, molecule, initPoint, toPoint) {
        this.molecule = molecule;
        this.initPoint = initPoint;
        this.toPoint = toPoint;
        MoveMoleculeAction.__super__.constructor.call(this, sketcher);
      }

      MoveMoleculeAction.prototype.redo = function() {
        var delta;
        delta = new this.sketcher.Point({
          x: this.toPoint.x - this.initPoint.x,
          y: this.toPoint.y - this.initPoint.y
        });
        return this.molecule.translate(delta);
      };

      MoveMoleculeAction.prototype.undo = function() {
        var delta;
        delta = new this.sketcher.Point({
          x: this.initPoint.x - this.toPoint.x,
          y: this.initPoint.y - this.toPoint.y
        });
        return this.molecule.translate(delta);
      };

      return MoveMoleculeAction;

    })(_Action);
    RotateMoleculeAction = (function(_super) {

      __extends(RotateMoleculeAction, _super);

      function RotateMoleculeAction(sketcher, molecule, initPoint, lastPoint, center) {
        this.molecule = molecule;
        this.initPoint = initPoint;
        this.lastPoint = lastPoint;
        this.center = center;
        RotateMoleculeAction.__super__.constructor.call(this, sketcher);
      }

      RotateMoleculeAction.prototype.redo = function() {
        var child, diff, i, l, _results;
        diff = this.lastPoint.angle - this.initPoint.angle;
        this.molecule.rotate(diff, this.center);
        i = 0;
        l = this.molecule.children.length;
        _results = [];
        while (i < l) {
          child = this.molecule.children[i];
          if (child.dType && child.dType === 'label') {
            child.rotate(-diff);
          }
          _results.push(i++);
        }
        return _results;
      };

      RotateMoleculeAction.prototype.undo = function() {
        var child, diff, i, l, _results;
        diff = this.initPoint.angle - this.lastPoint.angle;
        this.molecule.rotate(diff, this.center);
        i = 0;
        l = this.molecule.children.length;
        _results = [];
        while (i < l) {
          child = this.molecule.children[i];
          if (child.dType && child.dType === 'label') {
            child.rotate(-diff);
          }
          _results.push(i++);
        }
        return _results;
      };

      return RotateMoleculeAction;

    })(_Action);
    DeleteBondAction = (function(_super) {

      __extends(DeleteBondAction, _super);

      function DeleteBondAction(sketcher, molecule, bond, molecules) {
        this.molecule = molecule;
        this.bond = bond;
        this.molecules = molecules;
        DeleteBondAction.__super__.constructor.call(this, sketcher);
      }

      DeleteBondAction.prototype.redo = function() {
        var i, l, ll, molecules, _results;
        if (this.bond.n_a) {
          this.sketcher.deleteFromNode(this.bond, this.bond.n_a);
        }
        if (this.bond.n_b) {
          this.sketcher.deleteFromNode(this.bond, this.bond.n_b);
        }
        this.bond.remove();
        if (this.bond.bondOrder === 2) {
          this.bond.multiple[0].remove();
        }
        if (this.molecule.children.length) {
          molecules = this.sketcher.checkMolecule(this.molecule);
          if (this.molecules.length) {
            l = molecules.length - 1;
            _results = [];
            while (l > -1) {
              if (molecules[l] !== this.molecule) {
                this.molecules[l].addChildren(molecules[l].children);
                molecules[l].remove();
                i = 0;
                ll = this.molecules[l].children.length;
                while (i < ll) {
                  if (this.molecules[l].children[i] === this.bond) {
                    this.bond.remove();
                  }
                  this.molecules[l].children[i].molecule = this.molecules[l];
                  i++;
                }
              }
              _results.push(l--);
            }
            return _results;
          } else {
            return this.molecules = molecules;
          }
        }
      };

      DeleteBondAction.prototype.undo = function() {
        this.molecule.addChild(this.bond);
        if (this.bond.n_a && this.bond.n_a.connections.length) {
          this.sketcher.reconnect(this.bond.n_a.connections[0], this.bond, this.bond.n_a.point);
        }
        if (this.bond.n_b && this.bond.n_b.connections.length) {
          return this.sketcher.reconnect(this.bond.n_b.connections[0], this.bond, this.bond.n_b.point, "alt");
        }
      };

      return DeleteBondAction;

    })(_Action);
    NewBondAction = (function(_super) {

      __extends(NewBondAction, _super);

      function NewBondAction(sketcher, molecule, bond) {
        this.molecule = molecule;
        this.bond = bond;
        NewBondAction.__super__.constructor.call(this, sketcher);
        this.molecules = [];
        this.deleteAction = new DeleteBondAction(sketcher, molecule, bond, this.molecules);
      }

      NewBondAction.prototype.redo = function() {
        return this.deleteAction.undo();
      };

      NewBondAction.prototype.undo = function() {
        return this.deleteAction.redo();
      };

      return NewBondAction;

    })(_Action);
    NewRingAction = (function(_super) {

      __extends(NewRingAction, _super);

      function NewRingAction(sketcher, bonds) {
        var i, l, molecules;
        this.bonds = bonds;
        NewRingAction.__super__.constructor.call(this, sketcher);
        this.actions = [];
        i = 0;
        l = bonds.length;
        while (i < l) {
          molecules = [];
          this.actions.push(new DeleteBondAction(sketcher, bonds[i].molecule, bonds[i], molecules));
          i++;
        }
      }

      NewRingAction.prototype.redo = function() {
        var i, l, _results;
        i = 0;
        l = this.actions.length;
        _results = [];
        while (i < l) {
          this.actions[i].undo();
          _results.push(i++);
        }
        return _results;
      };

      NewRingAction.prototype.undo = function() {
        var l, _results;
        l = this.actions.length - 1;
        _results = [];
        while (l > -1) {
          this.actions[l].redo();
          _results.push(l--);
        }
        return _results;
      };

      return NewRingAction;

    })(_Action);
    NewAtomLabelAction = (function(_super) {

      __extends(NewAtomLabelAction, _super);

      function NewAtomLabelAction(sketcher, node, label) {
        this.node = node;
        this.label = label;
        NewAtomLabelAction.__super__.constructor.call(this, sketcher);
      }

      NewAtomLabelAction.prototype.redo = function() {
        this.sketcher.addLabelToNode(this.node, this.label);
        return this.sketcher.updateBonds(this.label.connections, this.node.segment.point, this.label.bounds.center);
      };

      NewAtomLabelAction.prototype.undo = function() {
        return this.sketcher.deleteLabel(this.label);
      };

      return NewAtomLabelAction;

    })(_Action);
    HistoryManager = (function() {

      function HistoryManager(sketcher) {
        this.sketcher = sketcher;
        this.undoStack = [];
        this.redoStack = [];
      }

      HistoryManager.prototype.addAction = function(action) {
        this.undoStack.push(action);
        this.redoStack = [];
        $(".toolbaricons-redo").parent().addClass("disable");
        return $(".toolbaricons-undo").parent().removeClass("disable");
      };

      HistoryManager.prototype.doUndo = function() {
        var action;
        if (this.undoStack.length) {
          action = this.undoStack[this.undoStack.length - 1];
          action.undo();
          this.sketcher.view.draw();
          this.redoStack.push(action);
          this.undoStack.splice(this.undoStack.indexOf(action), 1);
          if (this.undoStack.length === 0) {
            $(".toolbaricons-undo").parent().addClass("disable");
          }
          return $(".toolbaricons-redo").parent().removeClass("disable");
        }
      };

      HistoryManager.prototype.doRedo = function() {
        var action;
        if (this.redoStack.length) {
          action = this.redoStack[this.redoStack.length - 1];
          action.redo();
          this.sketcher.view.draw();
          this.undoStack.push(action);
          this.redoStack.splice(this.redoStack.indexOf(action), 1);
          if (this.redoStack.length === 0) {
            $(".toolbaricons-redo").parent().addClass("disable");
          }
          return $(".toolbaricons-undo").parent().removeClass("disable");
        }
      };

      return HistoryManager;

    })();
    _State = (function() {

      function _State(sketcher) {
        this.sketcher = sketcher;
      }

      return _State;

    })();
    NewSingleBond = (function(_super) {

      __extends(NewSingleBond, _super);

      function NewSingleBond(sketcher, stereo) {
        this.stereo = stereo;
        NewSingleBond.__super__.constructor.call(this, sketcher);
        this.bondOrder = 1;
      }

      NewSingleBond.prototype.mouseUp = function(e, hitResult) {
        var bond, extra, i, l;
        if (hitResult && hitResult.type === 'stroke') {
          bond = hitResult.item;
          if (bond.bondType && bond.bondType === "aux") {
            bond = bond.mainBond;
          }
          if (bond.bondOrder && bond.bondOrder !== 1) {
            i = 0;
            l = bond.multiple.length;
            while (i < l) {
              extra = bond.multiple[i];
              bond.multiple.splice(0, 1);
              extra.remove();
              bond.bondOrder = 1;
              i++;
            }
          }
          if (this.stereo === 'wedged') {
            return this.sketcher.mkWedgedBond(hitResult.item);
          } else if (this.stereo === 'hashed') {
            return this.sketcher.mkHashedBond(hitResult.item);
          } else {
            return this.sketcher.doMouseUp(e, hitResult);
          }
        } else {
          bond = this.sketcher.doMouseUp(e, hitResult);
          if (this.stereo === 'wedged') {
            return this.sketcher.mkWedgedBond(bond);
          } else if (this.stereo === 'hashed') {
            return this.sketcher.mkHashedBond(bond);
          }
        }
      };

      return NewSingleBond;

    })(_State);
    NewDoubleBond = (function(_super) {

      __extends(NewDoubleBond, _super);

      function NewDoubleBond(sketcher) {
        NewDoubleBond.__super__.constructor.call(this, sketcher);
      }

      NewDoubleBond.prototype.mouseUp = function(e, hitResult) {
        var bond, doubleBond;
        if (hitResult && hitResult.type === 'stroke') {
          return bond = this.sketcher.mkDoubleBond(e, hitResult.item);
        } else {
          bond = this.sketcher.doMouseUp(e, hitResult);
          return doubleBond = this.sketcher.mkDoubleBond(e, bond);
        }
      };

      return NewDoubleBond;

    })(_State);
    NewTripleBond = (function(_super) {

      __extends(NewTripleBond, _super);

      function NewTripleBond() {}

      return NewTripleBond;

    })(_State);
    NewAtomLabel = (function(_super) {

      __extends(NewAtomLabel, _super);

      function NewAtomLabel(sketcher) {
        NewAtomLabel.__super__.constructor.call(this, sketcher);
        this.label = 'C';
      }

      NewAtomLabel.prototype.setLabel = function(label) {
        return this.label = label;
      };

      NewAtomLabel.prototype.mouseUp = function(e, hitResult) {
        return this.sketcher.addUpdateLabel(e, hitResult, this.label);
      };

      return NewAtomLabel;

    })(_State);
    NewRing6 = (function(_super) {

      __extends(NewRing6, _super);

      function NewRing6() {
        return NewRing6.__super__.constructor.apply(this, arguments);
      }

      NewRing6.prototype.mouseUp = function(e, hitResult) {
        var bonds;
        bonds = this.sketcher.mkRing(hitResult, 6);
        return this.sketcher.historyManager.addAction(new NewRingAction(this.sketcher, bonds));
      };

      return NewRing6;

    })(_State);
    NewRing5 = (function(_super) {

      __extends(NewRing5, _super);

      function NewRing5() {
        return NewRing5.__super__.constructor.apply(this, arguments);
      }

      NewRing5.prototype.mouseUp = function(e, hitResult) {
        var bonds;
        bonds = this.sketcher.mkRing(hitResult, 5);
        return this.sketcher.historyManager.addAction(new NewRingAction(this.sketcher, bonds));
      };

      return NewRing5;

    })(_State);
    NewRing4 = (function(_super) {

      __extends(NewRing4, _super);

      function NewRing4() {
        return NewRing4.__super__.constructor.apply(this, arguments);
      }

      NewRing4.prototype.mouseUp = function(e, hitResult) {
        var bonds;
        bonds = this.sketcher.mkRing(hitResult, 4);
        return this.sketcher.historyManager.addAction(new NewRingAction(this.sketcher, bonds));
      };

      return NewRing4;

    })(_State);
    NewRing3 = (function(_super) {

      __extends(NewRing3, _super);

      function NewRing3() {
        return NewRing3.__super__.constructor.apply(this, arguments);
      }

      NewRing3.prototype.mouseUp = function(e, hitResult) {
        var bonds;
        bonds = this.sketcher.mkRing(hitResult, 3);
        return this.sketcher.historyManager.addAction(new NewRingAction(this.sketcher, bonds));
      };

      return NewRing3;

    })(_State);
    NewRing7 = (function(_super) {

      __extends(NewRing7, _super);

      function NewRing7() {
        return NewRing7.__super__.constructor.apply(this, arguments);
      }

      NewRing7.prototype.mouseUp = function(e, hitResult) {
        var bonds;
        bonds = this.sketcher.mkRing(hitResult, 7);
        return this.sketcher.historyManager.addAction(new NewRingAction(this.sketcher, bonds));
      };

      return NewRing7;

    })(_State);
    NewRing8 = (function(_super) {

      __extends(NewRing8, _super);

      function NewRing8() {
        return NewRing8.__super__.constructor.apply(this, arguments);
      }

      NewRing8.prototype.mouseUp = function(e, hitResult) {
        var bonds;
        bonds = this.sketcher.mkRing(hitResult, 8);
        return this.sketcher.historyManager.addAction(new NewRingAction(this.sketcher, bonds));
      };

      return NewRing8;

    })(_State);
    Delete = (function(_super) {

      __extends(Delete, _super);

      function Delete() {
        return Delete.__super__.constructor.apply(this, arguments);
      }

      Delete.prototype.mouseUp = function(e, hitResult) {
        return this.sketcher.iDelete();
      };

      return Delete;

    })(_State);
    StateManager = (function() {

      function StateManager(sketcher) {
        this.sketcher = sketcher;
        this.NEW_SINGLE_BOND = new NewSingleBond(sketcher, 'none');
        this.NEW_DOUBLE_BOND = new NewDoubleBond(sketcher);
        this.NEW_TRIPLE_BOND = new NewTripleBond(sketcher);
        this.NEW_RING_6 = new NewRing6(sketcher);
        this.NEW_RING_5 = new NewRing5(sketcher);
        this.NEW_RING_4 = new NewRing4(sketcher);
        this.NEW_RING_3 = new NewRing3(sketcher);
        this.NEW_RING_7 = new NewRing7(sketcher);
        this.NEW_RING_8 = new NewRing8(sketcher);
        this.DELETE = new Delete(sketcher);
        this.NEW_ATOM_LABEL = new NewAtomLabel(sketcher);
        this.currentState = void 0;
      }

      StateManager.prototype.setState = function(state) {
        return this.currentState = state;
      };

      StateManager.prototype.getCurrentState = function() {
        return this.currentState;
      };

      return StateManager;

    })();
    (function(c, pencil, items, m, Ele, io) {
      "use strict";

      var _;
      c.Canvas = function(canvas_id, width, height) {
        var canvas, container, left_menu, molInput, periodic_table, right_menu, tool, top_menu,
          _this = this;
        Array.prototype.distinct = function() {
          var distinctArray, i;
          distinctArray = [];
          i = 0;
          while (i < this.length) {
            if (distinctArray.indexOf(this[i]) === -1) {
              distinctArray.push(this[i]);
            }
            i++;
          }
          return distinctArray;
        };
        this.stateManager = new StateManager(this);
        this.historyManager = new HistoryManager(this);
        this.Ele = Ele;
        this.io = io;
        canvas = $('#' + canvas_id);
        container = canvas.parent();
        container.addClass("chem-canvas-container");
        if (width) {
          container.width(width);
        } else {
          container.width($('#content-container').width());
        }
        container.height(height);
        canvas.addClass("chem-canvas");
        container.append("<div class='top-toolbar'></div><div class='left-toolbar'></div><div class='right-toolbar'></div>");
        canvas.width(container.width() - 76);
        canvas.height(container.height() - 40);
        left_menu = container.find('.left-toolbar');
        right_menu = container.find('.right-toolbar');
        top_menu = container.find('.top-toolbar');
        right_menu.append("<div class='btn-group right-menu' style='top: 2px;' data-toggle='buttons'>        <label class='btn chem-btn' style='left: 2px; font-size: 24px; color: #808080; padding-top: 0; height: 36px'>        <input type='radio' name='options'>H        </label>        <label class='btn chem-btn' style='margin-top: 1px; font-size: 24px; color: #F090A0; padding-top: 0'>          <input type='radio' name='options'>B        </label>        <label class='btn chem-btn' style='font-size: 24px; color: #000000;; padding-top: 0'>        <input type='radio' name='options'>C        </label>        <label class='btn chem-btn' style='font-size: 24px; color: #3050F8; padding-top: 0'>        <input type='radio' name='options'>N        </label>        <label class='btn chem-btn' style='font-size: 24px; color: #FF0D0D; padding-top: 0px'>        <input type='radio' name='options'>O        </label>        <label class='btn chem-btn' style='font-size: 24px; color: #B09276; padding-top: 0px; padding-left: 6px'>        <input type='radio' name='options'>Si        </label>        </label>        <label class='btn chem-btn' style='font-size: 24px; color: #FFC832; padding-top: 0px'>        <input type='radio' name='options'>S        </label>        <label class='btn chem-btn' style='font-size: 24px; color: #FF8000; padding-top: 0px'>        <input type='radio' name='options'>P        </label>        <label class='btn chem-btn' style='font-size: 24px; color: #228B22; padding-top: 0px'>        <input type='radio' name='options'>F        </label>        <label class='btn chem-btn' style='font-size: 24px; color: #1DC51D; padding-top: 0px; padding-left: 5px'>        <input type='radio' name='options'>Cl        </label>        <label class='btn chem-btn' style='font-size: 24px; color: #A62929; padding-top: 0px; padding-left: 5px'>        <input type='radio' name='options'>Br        </label>        <label class='btn chem-btn' style='font-size: 24px; color: #940094; padding-top: 0px'>        <input type='radio' name='options'>I        </label>      </div>      <div class='btn-group right-menu style=''>        <label class='btn chem-btn periodic_table_open' style='font-size: 24px; color: #008FFF; padding-top: 0px;'>          <span class='glyphicon glyphicon-th' style='font-size: 20px; top: 1px'></span>        </label>      </div>");
        left_menu.append("<div class='btn-group' data-toggle='buttons'>        <label class='btn chem-btn pencil' title='Universal Pen' style='left: 2px; top: 2px'>          <input type='radio' name='options'>          <a class='dropdown-toggle' data-toggle='dropdown'><span class='glyphicon glyphicon-pencil' style='top: 5px; font-size: 16px'></span><b class='custom-caret'></b></a>          <ul class='dropdown-menu' style='z-index: 1100; overflow: visible; text-shadow: none;'>                  <li><a href='#'>Action</a></li>                  <li><a href='#'>Another action</a></li>                  <li><a href='#'>Something else here</a></li>                  <li class='divider'></li>                  <li><a href='#'>Separated link</a></li>                  <li><a href='#'>One more separated link</a></li>                </ul>        </label>        <label class='btn chem-btn' title='Delete bond' style='margin-top: 4px'>          <input type='radio' name='options'><span class='glyphicon glyphicon-remove' style='top: 4px'></span>        </label>        <label class='btn chem-btn' title='Single bond' style=''>          <input type='radio' name='options'><span class='chemglyph chemglyph-single-bond'></span>        </label>        <label class='btn chem-btn' title='Double bond'>          <input type='radio' name='options'><span class='chemglyph chemglyph-double-bond'></span>        </label>        <label class='btn chem-btn' title='Triple bond'>          <input type='radio' name='options'><span class='chemglyph chemglyph-triple-bond'></span>        </label>        <label class='btn chem-btn' title='Hashed bond'>          <input type='radio' name='options'><span class='chemglyph chemglyph-recessed-bond'></span>        </label>        <label class='btn chem-btn' title='Wedged bond'>          <input type='radio' name='options'><span class='chemglyph chemglyph-protruding-bond'></span>        </label>        <label class='btn chem-btn' title='Cyclopropane'>          <input type='radio' name='options'><span class='chemglyph chemglyph-ring-3'></span>        </label>        <label class='btn chem-btn' title='Cyclobutane'>          <input type='radio' name='options'><span class='chemglyph chemglyph-ring-4'></span>        </label>        <label class='btn chem-btn' title='Cyclopentane'>          <input type='radio' name='options'><span class='chemglyph chemglyph-ring-5'></span>        </label>        <label class='btn chem-btn' title='Cylohexane'>          <input type='radio' name='options'><span class='chemglyph chemglyph-ring-6'></span>        </label>        <label class='btn chem-btn' title='Cycloheptane'>          <input type='radio' name='options'><span class='chemglyph chemglyph-ring-7'></span>        </label>        <label class='btn chem-btn' title='Cyclooctane'>          <input type='radio' name='options'><span class='chemglyph chemglyph-ring-8'></span>        </label>      </div>");
        top_menu.append("<div class='btn-group' style='left: 48px; top: 1px;'>        <label class='btn chem-btn toolbar' title='Clear all' style=''>          <span class='toolbaricons toolbaricons-new'></span>        </label>        <label class='btn chem-btn' title='Import' style=''>          <input class='file hidden' id='fileInput' type='file' name='files'><span class='toolbaricons toolbaricons-import'></span>        </label>        <label class='btn chem-btn' title='Export' style=''>          <span class='toolbaricons toolbaricons-export'></span>        </label>        <label class='btn chem-btn toolbar disable' title='Duplicate selection' style=''>          <span class='toolbaricons toolbaricons-copy'></span>        </label>        <label class='btn chem-btn toolbar disable' title='Undo' style=''>          <span class='toolbaricons toolbaricons-undo'></span>        </label>        <label class='btn chem-btn toolbar disable' title='Redo' style=''>          <span class='toolbaricons toolbaricons-redo'></span>        </label>        <label class='btn chem-btn toolbar' title='Zoom in' style=''>          <span class='glyphicon glyphicon-zoom-in' style='font-size: 20px; left: -1px'></span>        </label>        <label class='btn chem-btn toolbar' title='Zoom out' style=''>          <span class='glyphicon glyphicon-zoom-out' style='font-size: 20px; left: -1px'></span>        </label>        <label class='btn chem-btn toolbar' title='Print' style=''>          <span class='toolbaricons toolbaricons-print'></span>        </label>        <label class='btn chem-btn toolbar' title='Exit' style=''>          <span class='toolbaricons toolbaricons-exit'></span>        </label>      </div>");
        $("body").before("        <div id='periodic_table' style='display: none; background-color: #DDDDDD'>        <div style='text-align: center'>        <label class='btn btn-default periodic_table_close' style='margin: 5px;' aria-hidden='true'>Close</label>        </div>        </div>");
        $("#periodic_table").prepend("        <?xml version='1.0' encoding='utf-8'?>        <svg version='1.1' id='mendeley' xmlns='http://www.w3.org/2000/svg' x='0px' y='0px'        width='713.667px' height='368.352px' viewBox='0 0 713.667 368.352' enable-background='new 0 0 713.667 368.352'        xml:space='preserve' style='display: block'>          <g>          <rect x='103' y='23' fill='#D8D8D8' stroke='#E8E8E8' stroke-width='2px' width='348.412' height='76.412'/>          <text transform='matrix(1 0 0 1 107.6948 42)' fill='#2194D6' font-family='Helvetica' font-size='18'>Hydrogen</text>          <text transform='matrix(1 0 0 1 107.6948 65)' font-family='Helvetica' font-size='14'>1s1</text>          <text transform='matrix(1 0 0 1 445 42)' font-family='Helvetica' font-size='16' text-anchor='end'>1</text>          <text transform='matrix(1 0 0 1 445 92)' font-family='Helvetica' font-size='22' text-anchor='end'>1.0079</text>          </g><g>          <rect x='3' y='3' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 11.6948 31)' fill='#808080' font-family='Helvetica' font-size='24'>H</text>          </g><g>          <rect x='673.588' y='3' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 676.2988 31)' fill='#849B9B' font-family='Helvetica' font-size='24'>He</text>          </g><g>          <rect x='3' y='42.446' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 11.0493 70)' fill='#C87EFA' font-family='Helvetica' font-size='24'>Li</text>          </g><g>          <rect x='42.446' y='42.446' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 45.9336 70)' fill='#82AB00' font-family='Helvetica' font-size='24'>Be</text>          </g><g>          <rect x='476.356' y='42.446' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 486.3301 70)' fill='#F090A0' font-family='Helvetica' font-size='24'>B</text>          </g><g>          <rect x='515.803' y='42.446' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 524.6953 70)' font-family='Helvetica' font-size='24'>C</text>          </g><g>          <rect x='555.249' y='42.446' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 564.6953 70)' fill='#304FF7' font-family='Helvetica' font-size='24'>N</text>          </g><g>          <rect x='594.695' y='42.446' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 604.0547 70)' fill='#FF0D0D' font-family='Helvetica' font-size='24'>O</text>          </g><g>          <rect x='634.142' y='42.446' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 644.9756 70)' fill='#228B22' font-family='Helvetica' font-size='24'>F</text>          </g><g>          <rect x='673.588' y='42.446' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 676.2988 70)' fill='#7B9CA8' font-family='Helvetica' font-size='24'>Ne</text>          </g><g>          <rect x='3' y='81.893' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 6.2993 109)' fill='#AB5CF2' font-family='Helvetica' font-size='24'>Na</text>          </g><g>          <rect x='42.446' y='81.893' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 44.0244 109)' fill='#61B400' font-family='Helvetica' font-size='24'>Mg</text>          </g><g>          <rect x='476.356' y='81.893' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 483.7744 109)' fill='#A79191' font-family='Helvetica' font-size='24'>Al</text>          </g><g>          <rect x='515.803' y='81.893' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 521.7744 109)' fill='#B09276' font-family='Helvetica' font-size='24'>Si</text>          </g><g>          <rect x='555.249' y='81.893' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 565.3301 109)' fill='#FF8000' font-family='Helvetica' font-size='24'>P</text>          </g><g>          <rect x='594.695' y='81.893' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 605.3301 109)' fill='#FFC832' font-family='Helvetica' font-size='24'>S</text>          </g><g>          <rect x='634.142' y='81.893' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 640.1406 109)' fill='#1DC51D' font-family='Helvetica' font-size='24'>Cl</text>          </g><g>          <rect x='673.588' y='81.893' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 679.5 109)' fill='#63A2B0' font-family='Helvetica' font-size='24'>Ar</text>          </g><g>          <rect x='3' y='121.339' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 12.3296 149)' fill='#8F40D4' font-family='Helvetica' font-size='24'>K</text>          </g><g>          <rect x='42.446' y='121.339' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 45.2993 149)' fill='#2FC300' font-family='Helvetica' font-size='24'>Ca</text>          </g><g>          <rect x='81.893' y='121.339' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 85.5796 149)' fill='#969696' font-family='Helvetica' font-size='24'>Sc</text>          </g><g>          <rect x='121.339' y='121.339' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 128.8472 149)' fill='#94969A' font-family='Helvetica' font-size='24'>Ti</text>          </g><g>          <rect x='160.786' y='121.339' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 171.3296 149)' fill='#96969A' font-family='Helvetica' font-size='24'>V</text>          </g><g>          <rect x='200.232' y='121.339' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 205.8652 149)' fill='#8796C3' font-family='Helvetica' font-size='24'>Cr</text>          </g><g>          <rect x='239.678' y='121.339' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 241.0244 149)' fill='#9C7AC7' font-family='Helvetica' font-size='24'>Mn</text>          </g><g>          <rect x='279.125' y='121.339' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 283.5796 149)' fill='#E06633' font-family='Helvetica' font-size='24'>Fe</text>          </g><g>          <rect x='318.571' y='121.339' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 321.2993 149)' fill='#DB8293' font-family='Helvetica' font-size='24'>Co</text>          </g><g>          <rect x='358.018' y='121.339' fill='#D8D8D8' stroke='#E8E8E8' width='36.411' height='36.412'/>          <text transform='matrix(1 0 0 1 364.1406 149)' fill='#45B645' font-family='Helvetica' font-size='24'>Ni</text>          </g><g>          <rect x='397.464' y='121.339' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 400.2988 149)' fill='#C78033' font-family='Helvetica' font-size='24'>Cu</text>          </g><g>          <rect x='436.91' y='121.339' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 441.5801 149)' fill='#7D80B0' font-family='Helvetica' font-size='24'>Zn</text>          </g><g>          <rect x='476.356' y='121.339' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 479.6592 149)' fill='#BD8C8C' font-family='Helvetica' font-size='24'>Ga</text>          </g><g>          <rect x='515.803' y='121.339' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 518.6592 149)' fill='#668F8F' font-family='Helvetica' font-size='24'>Ge</text>          </g><g>          <rect x='555.249' y='121.339' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 559.5801 149)' fill='#BD80E3' font-family='Helvetica' font-size='24'>As</text>          </g><g>          <rect x='594.695' y='121.339' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 598.9336 149)' fill='#E28F00' font-family='Helvetica' font-size='24'>Se</text>          </g><g>          <rect x='634.142' y='121.339' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 639.5 149)' fill='#A62929' font-family='Helvetica' font-size='24'>Br</text>          </g><g>          <rect x='673.588' y='121.339' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 678.5 149)' fill='#53A6BC' font-family='Helvetica' font-size='24'>Kr</text>          </g><g>          <rect x='3' y='160.786' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 6.2993 188)' fill='#702EB0' font-family='Helvetica' font-size='24'>Rb</text>          </g><g>          <rect x='42.446' y='160.786' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 48.5 188)' fill='#00D000' font-family='Helvetica' font-size='24'>Sr</text>          </g><g>          <rect x='81.893' y='160.786' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 91.3296 188)' fill='#5FA4A4' font-family='Helvetica' font-size='24'>Y</text>          </g><g>          <rect x='121.339' y='160.786' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 128.1455 188)' fill='#6BA2A2' font-family='Helvetica' font-size='24'>Zr</text>          </g><g>          <rect x='160.786' y='160.786' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 163.2993 188)' fill='#61A4A9' font-family='Helvetica' font-size='24'>Nb</text>          </g><g>          <rect x='200.232' y='160.786' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 202.0244 188)' fill='#4EA9A9' font-family='Helvetica' font-size='24'>Mo          </g><g>          <rect x='239.678' y='160.786' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 244.5 188)' fill='#3B9E9E' font-family='Helvetica' font-size='24'>Tc</text>          </g><g>          <rect x='279.125' y='160.786' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 281.2993 188)' fill='#248F8F' font-family='Helvetica' font-size='24'>Ru</text>          </g><g>          <rect x='318.571' y='160.786' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 321.2993 188)' fill='#0A7D8C' font-family='Helvetica' font-size='24'>Rh</text>          </g><g>          <rect x='358.018' y='160.786' fill='#D8D8D8' stroke='#E8E8E8' width='36.411' height='36.412'/>          <text transform='matrix(1 0 0 1 360.9336 188)' fill='#006985' font-family='Helvetica' font-size='24'>Pd</text>          </g><g>          <rect x='397.464' y='160.786' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 400.9336 188)' fill='#969696' font-family='Helvetica' font-size='24'>Ag</text>          </g><g>          <rect x='436.91' y='160.786' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 439.2988 188)' fill='#AE9462' font-family='Helvetica' font-size='24'>Cd</text>          </g><g>          <rect x='476.356' y='160.786' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 484.4092 188)' fill='#A67573' font-family='Helvetica' font-size='24'>In</text>          </g><g>          <rect x='515.803' y='160.786' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 518.9336 188)' fill='#668080' font-family='Helvetica' font-size='24'>Sn</text>          </g><g>          <rect x='555.249' y='160.786' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 557.9336 188)' fill='#9E63B5' font-family='Helvetica' font-size='24'>Sb</text>          </g><g>          <rect x='594.695' y='160.786' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 599.8545 188)' fill='#D47A00' font-family='Helvetica' font-size='24'>Te</text>          </g><g>          <rect x='634.142' y='160.786' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 647.8047 188)' fill='#940094' font-family='Helvetica' font-size='24'>I</text>          </g><g>          <rect x='673.588' y='160.786' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 676.9336 188)' fill='#429EB0' font-family='Helvetica' font-size='24'>Xe</text>          </g><g>          <rect x='3' y='200.231' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 6.9448 228)' fill='#57178F' font-family='Helvetica' font-size='24'>Cs</text>          </g><g>          <rect x='42.446' y='200.231' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 45.9336 228)' fill='#00C900' font-family='Helvetica' font-size='24'>Ba</text>          </g><g>          <rect x='81.893' y='200.231' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 86.2085 228)' fill='#57A4C5' font-family='Helvetica' font-size='24'>La</text>          </g><g>          <rect x='121.339' y='200.231' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 127.5 228)' fill='#42A8DC' font-family='Helvetica' font-size='24'>Hf</text>          </g><g>          <rect x='160.786' y='200.231' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 165.8545 228)' fill='#4BA2F9' font-family='Helvetica' font-size='24'>Ta</text>          </g><g>          <rect x='200.232' y='200.231' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 207.1455 228)' fill='#2194D6' font-family='Helvetica' font-size='24'>W</text>          </g><g>          <rect x='239.678' y='200.231' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 243.2993 228)' fill='#267DAB' font-family='Helvetica' font-size='24'>Re</text>          </g><g>          <rect x='279.125' y='200.231' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 282.3047 228)' fill='#266696' font-family='Helvetica' font-size='24'>Os</text>          </g><g>          <rect x='318.571' y='200.231' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 328.9756 228)' fill='#175487' font-family='Helvetica' font-size='24'>Ir</text>          </g><g>          <rect x='358.018' y='200.231' fill='#D8D8D8' stroke='#E8E8E8' width='36.411' height='36.412'/>          <text transform='matrix(1 0 0 1 364.1348 228)' fill='#9595A0' font-family='Helvetica' font-size='24'>Pt</text>          </g><g>          <rect x='397.464' y='200.231' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 400.9336 228)' fill='#B9981A' font-family='Helvetica' font-size='24'>Au</text>          </g><g>          <rect x='436.91' y='200.231' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 440.2988 228)' fill='#9595A9' font-family='Helvetica' font-size='24'>Hg</text>          </g><g>          <rect x='476.356' y='200.231' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 483.4199 228)' fill='#A6544D' font-family='Helvetica' font-size='24'>Tl</text>          </g><g>          <rect x='515.803' y='200.231' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 518.9336 228)' fill='#575961' font-family='Helvetica' font-size='24'>Pb</text>          </g><g>          <rect x='555.249' y='200.231' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 561.7744 228)' fill='#9E4FB5' font-family='Helvetica' font-size='24'>Bi</text>          </g><g>          <rect x='594.695' y='200.231' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 597.9336 228)' fill='#AB5C00' font-family='Helvetica' font-size='24'>Po</text>          </g><g>          <rect x='634.142' y='200.231' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 639.1348 228)' fill='#754F45' font-family='Helvetica' font-size='24'>At</text>          </g><g>          <rect x='673.588' y='200.231' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 676.2988 228)' fill='#428296' font-family='Helvetica' font-size='24'>Rn</text>          </g><g>          <rect x='81.893' y='289.124' fill='#DDDDDD' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 84.2993 316)' fill='#989877' font-family='Helvetica' font-size='24'>Ce</text>          </g><g>          <rect x='120.893' y='289.124' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 126.5 317)' fill='#869D7B' font-family='Helvetica' font-size='24'>Pr</text>          </g><g>          <rect x='160.893' y='289.124' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 164.2993 317)' fill='#7DA07D' font-family='Helvetica' font-size='24'>Nd</text>          </g><g>          <rect x='199.893' y='289.124' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 200.75 317)' fill='#69A581' font-family='Helvetica' font-size='23'>Pm</text>          </g><g>          <rect x='239.125' y='289.124' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 239.75 317)' fill='#5EA883' font-family='Helvetica' font-size='23'>Sm</text>          </g><g>          <rect x='278.893' y='289.124' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 281.9336 317)' fill='#43B089' font-family='Helvetica' font-size='24'>Eu</text>          </g><g>          <rect x='318.893' y='289.124' fill='#D8D8D8' stroke='#E8E8E8' width='36.411' height='36.412'/>          <text transform='matrix(1 0 0 1 320.6592 317)' fill='#31B48D' font-family='Helvetica' font-size='24'>Gd</text>          </g><g>          <rect x='357.464' y='289.124' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 361.5801 317)' fill='#23B890' font-family='Helvetica' font-size='24'>Tb</text>          </g><g>          <rect x='396.91' y='289.124' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 399.9453 317)' fill='#17BB92' font-family='Helvetica' font-size='24'>Dy</text>          </g><g>          <rect x='436.893' y='289.124' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 439.2988 317)' fill='#00C578' font-family='Helvetica' font-size='24'>Ho</text>          </g><g>          <rect x='475.803' y='289.124' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 481.5 317)' fill='#00C765' font-family='Helvetica' font-size='24'>Er</text>          </g><g>          <rect x='515.893' y='289.124' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 517.3955 317)' fill='#00C94E' font-family='Helvetica' font-size='24'>Tm</text>          </g><g>          <rect x='554.695' y='289.124' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 557.9336 317)' fill='#00BF38' font-family='Helvetica' font-size='24'>Yb</text>          </g><g>          <rect x='594.142' y='289.124' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 599.209 316)' fill='#00AB24' font-family='Helvetica' font-size='24'>Lu</text>          </g><g>          <rect x='3' y='239.678' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 10.1455 267)' fill='#420066' font-family='Helvetica' font-size='24'>Fr</text>          </g><g>          <rect x='42.446' y='239.678' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 45.2993 267)' fill='#007D00' font-family='Helvetica' font-size='24'>Ra</text>          </g><g>          <rect x='81.893' y='239.678' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 85.5796 267)' fill='#669CE4' font-family='Helvetica' font-size='24'>Ac</text>          </g><g>          <rect x='121.339' y='239.678' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 126.5 267)' fill='#42A8DC' font-family='Helvetica' font-size='24'>Rf</text>          </g><g>          <rect x='160.786' y='239.678' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 163.2993 267)' fill='#4BA2F9' font-family='Helvetica' font-size='24'>Db</text>          </g><g>          <rect x='200.232' y='239.678' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 202.9336 267)' fill='#2194D6' font-family='Helvetica' font-size='24'>Sg</text>          </g><g>          <rect x='239.678' y='239.678' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 241.9336 267)' fill='#267DAB' font-family='Helvetica' font-size='24'>Bh</text>          </g><g>          <rect x='279.125' y='239.678' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 282.9453 267)' fill='#266696' font-family='Helvetica' font-size='24'>Hs</text>          </g><g>          <rect x='318.571' y='239.678' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 323.2256 267)' fill='#175487' font-family='Helvetica' font-size='24'>Mt</text>          </g><g>          <rect x='358.018' y='239.678' fill='#D8D8D8' stroke='#E8E8E8' width='36.411' height='36.412'/>          <text transform='matrix(1 0 0 1 361.9453 267)' fill='#9595A0' font-family='Helvetica' font-size='24'>Ds</text>          </g><g>          <rect x='397.464' y='239.678' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 400.2988 267)' fill='#B9981A' font-family='Helvetica' font-size='24'>Rg</text>          </g><g>          <rect x='436.91' y='239.678' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 440.2988 267)' fill='#9595A9' font-family='Helvetica' font-size='24'>Cn</text>          </g><g>          <rect x='476.91' y='238.678' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 479.2988 264)' fill='#000000' font-family='Helvetica' font-size='18'>Uut</text>          </g><g>          <rect x='516.91' y='238.678' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 519.2988 264)' fill='#000000' font-family='Helvetica' font-size='18'>Uuq</text>          </g><g>          <rect x='555.91' y='238.678' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 558.2988 264)' fill='#000000' font-family='Helvetica' font-size='18'>Uup</text>          </g><g>          <rect x='594.91' y='238.678' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 597.2988 264)' fill='#000000' font-family='Helvetica' font-size='18'>Uuh</text>          </g><g>          <rect x='633.91' y='238.678' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 636.2988 264)' fill='#000000' font-family='Helvetica' font-size='18'>Uus</text>          </g><g>          <rect x='672.91' y='238.678' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.412'/>          <text transform='matrix(1 0 0 1 675.2988 264)' fill='#000000' font-family='Helvetica' font-size='18'>Uuo</text>          </g><g>          <rect x='81.893' y='328.571' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.411'/>          <text transform='matrix(1 0 0 1 86.5796 356)' fill='#00B8FC' font-family='Helvetica' font-size='24'>Th</text>          </g><g>          <rect x='120.786' y='328.571' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.411'/>          <text transform='matrix(1 0 0 1 123.9336 356)' fill='#00A1FF' font-family='Helvetica' font-size='24'>Pa</text>          </g><g>          <rect x='160.893' y='328.571' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.411'/>          <text transform='matrix(1 0 0 1 170.6953 356)' fill='#008FFF' font-family='Helvetica' font-size='24'>U</text>          </g><g>          <rect x='199.678' y='328.571' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.411'/>          <text transform='matrix(1 0 0 1 202.2993 355)' fill='#0080FF' font-family='Helvetica' font-size='24'>Np</text>          </g><g>          <rect x='239.125' y='328.571' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.411'/>          <text transform='matrix(1 0 0 1 241.9336 355)' fill='#006BFF' font-family='Helvetica' font-size='24'>Pu</text>          </g><g>          <rect x='278.571' y='328.571' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.411'/>          <text transform='matrix(1 0 0 1 280.75 355)' fill='#545CF2' font-family='Helvetica' font-size='22'>Am</text>          </g><g>          <rect x='318.018' y='328.571' fill='#D8D8D8' stroke='#E8E8E8' width='36.411' height='36.411'/>          <text transform='matrix(1 0 0 1 319.1152 355)' fill='#785CE3' font-family='Helvetica' font-size='22'>Cm</text>          </g><g>          <rect x='357.464' y='328.571' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.411'/>          <text transform='matrix(1 0 0 1 362.5801 355)' fill='#8A4FE3' font-family='Helvetica' font-size='24'>Bk</text>          </g><g>          <rect x='396.91' y='328.571' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.411'/>          <text transform='matrix(1 0 0 1 402.5 355)' fill='#A136D4' font-family='Helvetica' font-size='24'>Cf</text>          </g><g>          <rect x='436.356' y='328.571' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.411'/>          <text transform='matrix(1 0 0 1 439.5801 355)' fill='#B31FD4' font-family='Helvetica' font-size='24'>Es</text>          </g><g>          <rect x='475.803' y='328.571' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.411'/>          <text transform='matrix(1 0 0 1 476.3955 355)' font-family='Helvetica' font-size='24'>Fm</text>          </g><g>          <rect x='515.249' y='328.571' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.411'/>          <text transform='matrix(1 0 0 1 517.0244 355)' font-family='Helvetica' font-size='24'>Md</text>          </g><g>          <rect x='554.695' y='328.571' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.411'/>          <text transform='matrix(1 0 0 1 557.2988 355)' font-family='Helvetica' font-size='24'>No</text>          </g><g>          <rect x='594.142' y='328.571' fill='#D8D8D8' stroke='#E8E8E8' width='36.412' height='36.411'/>          <text transform='matrix(1 0 0 1 599.7744 355)' font-family='Helvetica' font-size='24'>Lr</text>          </g>        </svg>");
        $("#periodic_table").popup({
          pagecontainer: '.container',
          outline: true,
          opacity: 0.4,
          transition: 'all 0.3s',
          onclose: function() {
            if (_this.activeEle === void 0) {
              return $('.periodic_table_open').removeClass("active");
            }
          }
        });
        this.customLabel = function() {
          var label, labelColor;
          $('.periodic_table_open').children().first().remove();
          label = this.activeEle.children().get(1).textContent.replace(/(^\s+|\s+$)/g, '');
          $('.periodic_table_open').text(label);
          if (label.length === 2) {
            $('.periodic_table_open').css("padding-left", "3px");
          }
          labelColor = this.activeEle.children().get(1).getAttribute('fill');
          if (!labelColor) {
            labelColor = "#000000";
          }
          $('.periodic_table_open').css('color', labelColor);
          if (this.stateManager.getCurrentState() !== this.stateManager.NEW_ATOM_LABEL) {
            this.stateManager.setState(this.stateManager.NEW_ATOM_LABEL);
          }
          return this.stateManager.getCurrentState().setLabel(label);
        };
        left_menu = $('.left-toolbar');
        right_menu = $('.right-toolbar');
        top_menu = $('.top-toolbar');
        $(".pencil").addClass("active");
        $(".chemglyph-single-bond").parent().bind('click', function() {
          _this.stateManager.setState(_this.stateManager.NEW_SINGLE_BOND);
          return _this.stateManager.NEW_SINGLE_BOND.stereo = 'none';
        });
        $(".chemglyph-ring-6").parent().bind('click', function() {
          return _this.stateManager.setState(_this.stateManager.NEW_RING_6);
        });
        $(".chemglyph-ring-5").parent().bind('click', function() {
          return _this.stateManager.setState(_this.stateManager.NEW_RING_5);
        });
        $(".chemglyph-ring-4").parent().bind('click', function() {
          return _this.stateManager.setState(_this.stateManager.NEW_RING_4);
        });
        $(".chemglyph-ring-3").parent().bind('click', function() {
          return _this.stateManager.setState(_this.stateManager.NEW_RING_3);
        });
        $(".chemglyph-ring-7").parent().bind('click', function() {
          return _this.stateManager.setState(_this.stateManager.NEW_RING_7);
        });
        $(".chemglyph-ring-8").parent().bind('click', function() {
          return _this.stateManager.setState(_this.stateManager.NEW_RING_8);
        });
        $(".glyphicon-pencil").parent().bind('click', function() {
          return _this.stateManager.setState(void 0);
        });
        $(".glyphicon-remove").parent().bind('click', function() {
          return _this.stateManager.setState(_this.stateManager.DELETE);
        });
        $(".toolbaricons-print").parent().bind('click', function() {
          return _this.printDoc();
        });
        $(".toolbaricons-new").parent().bind('click', function() {
          var l, layer;
          l = _this.layers.length - 1;
          while (l > -1) {
            layer = _this.layers[l];
            layer.remove();
            l--;
          }
          _this.molLayer = new _this.Layer();
          _this.molLayer.activate();
          _this.view.zoom = 1;
          _this.view.draw();
          _this.historyManager.undoStack = [];
          return _this.historyManager.redoStack = [];
        });
        right_menu.children().first().children().each(function(i, btn) {
          var that;
          that = _this;
          return $(btn).bind("click", function() {
            var activeEl;
            activeEl = left_menu.children().first().children().filter(function() {
              if ($(this).hasClass("active")) {
                return this;
              }
            });
            if (activeEl) {
              activeEl.removeClass("active");
            }
            return that.restoreTableIcon();
          });
        });
        left_menu.children().first().children().each(function(i, btn) {
          var that;
          that = _this;
          return $(btn).bind("click", function() {
            var activeEl;
            activeEl = right_menu.children().first().children().filter(function() {
              if ($(this).hasClass("active")) {
                return this;
              }
            });
            if (activeEl) {
              activeEl.removeClass("active");
            }
            return that.restoreTableIcon();
          });
        });
        $(".toolbaricons-undo").parent().bind('click', function() {
          if ($(".toolbaricons-undo").parent().hasClass("disable")) {
            return;
          }
          return _this.historyManager.doUndo();
        });
        $(".toolbaricons-redo").parent().bind('click', function() {
          if ($(".toolbaricons-redo").parent().hasClass("disable")) {
            return;
          }
          return _this.historyManager.doRedo();
        });
        $(".chemglyph-protruding-bond").parent().bind('click', function() {
          _this.stateManager.setState(_this.stateManager.NEW_SINGLE_BOND);
          return _this.stateManager.NEW_SINGLE_BOND.stereo = 'wedged';
        });
        $(".chemglyph-recessed-bond").parent().bind('click', function() {
          _this.stateManager.setState(_this.stateManager.NEW_SINGLE_BOND);
          return _this.stateManager.NEW_SINGLE_BOND.stereo = 'hashed';
        });
        $(".chemglyph-double-bond").parent().bind('click', function() {
          return _this.stateManager.setState(_this.stateManager.NEW_DOUBLE_BOND);
        });
        $(".toolbaricons-export").parent().bind('click', function() {
          var mol, molInter;
          if (_this.molLayer.children.length) {
            molInter = new MOLInterpreter(_this);
            mol = molInter.write(_this.molLayer.children[0]);
            console.log(mol);
            return molInter.read(mol);
          }
        });
        $(".glyphicon-zoom-in").parent().bind('click', function() {
          if (_this.view.zoom < 5) {
            return _this.view.zoom += 0.5;
          }
        });
        $(".glyphicon-zoom-out").parent().bind('click', function() {
          if (_this.view.zoom > 1) {
            return _this.view.zoom -= 0.5;
          }
        });
        molInput = $("#fileInput");
        molInput.bind("click", function() {
          return molInput.val(null);
        });
        molInput.on("change", function(e) {
          var file, molInter, reader, textType;
          file = molInput[0].files[0];
          textType = /mol.*/;
          if (file.type.match(textType)) {
            reader = new FileReader();
            molInter = new MOLInterpreter(_this);
            reader.onload = function(e) {
              return molInter.read(reader.result);
            };
            return reader.readAsText(file);
          } else {
            return console.log("File not supported!");
          }
        });
        $(".right-menu").children().each(function(i, btn) {
          var that;
          that = _this;
          if (i < 12) {
            return $(btn).bind('click', function() {
              if (that.stateManager.getCurrentState() !== that.stateManager.NEW_ATOM_LABEL) {
                that.stateManager.setState(that.stateManager.NEW_ATOM_LABEL);
              }
              return that.stateManager.getCurrentState().setLabel($(btn).text());
            });
          }
        });
        periodic_table = $("#mendeley").children();
        this.activeEle = void 0;
        periodic_table.each(function(i, ele) {
          if (i > 0) {
            $(ele).attr('cursor', 'pointer');
            $(ele).bind("mouseenter", function() {
              var color, conf, name, symbol;
              $(ele).children().first().attr("stroke", "#008FFF");
              if (Ele[$(ele).children().get(1).textContent.replace(/(^\s+|\s+$)/g, '')] !== void 0) {
                name = Ele[$(ele).children().get(1).textContent.replace(/(^\s+|\s+$)/g, '')].name;
              }
              color = $(ele).children().get(1).getAttribute("fill");
              _this.tableDisplay.children().get(1).setAttribute("fill", color);
              if (name) {
                symbol = Ele[$(ele).children().get(1).textContent.replace(/(^\s+|\s+$)/g, '')].symbol;
                conf = Ele[symbol].electronicConf.split("&middot;");
                conf = conf.join(' ');
                if (conf.indexOf("]" !== -1)) {
                  conf = conf.replace("]", "] ");
                }
                _this.tableDisplay.children().get(1).textContent = Ele[symbol].name;
                _this.tableDisplay.children().get(3).textContent = Ele[symbol].atomicNumber;
                if ((Ele[symbol].atomicMass * 2) % 2 !== 0) {
                  _this.tableDisplay.children().get(4).textContent = Number(Ele[symbol].atomicMass).toFixed(3).toString();
                } else {
                  _this.tableDisplay.children().get(4).textContent = Ele[symbol].atomicMass;
                }
                if (conf) {
                  return _this.tableDisplay.children().get(2).textContent = conf;
                } else {
                  return _this.tableDisplay.children().get(2).textContent = "";
                }
              } else {
                _this.tableDisplay.children().get(1).textContent = Ele[$(ele).children().get(1).textContent.replace(/(^\s+|\s+$)/g, '')].name;
                return _this.tableDisplay.children().get(2).textContent = "";
              }
            });
            $(ele).bind("mouseleave", function() {
              if ($(ele).children().first().attr("fill") !== "#FFFFFF") {
                return $(ele).children().first().attr("stroke", '#E8E8E8');
              }
            });
            return $(ele).bind("click", function() {
              var activeEl;
              if (_this.activeEle && _this.activeEle.children().first().attr("fill") === "#FFFFFF") {
                _this.activeEle.children().first().attr("stroke", "#E8E8E8");
                _this.activeEle.children().first().attr("fill", "#D8D8D8");
              }
              $(ele).children().first().attr("fill", "#FFFFFF");
              $(ele).children().first().attr("stroke", "#008FFF");
              _this.activeEle = $(ele);
              _this.customLabel();
              activeEl = left_menu.children().first().children().filter(function() {
                if ($(this).hasClass("active")) {
                  return this;
                }
              });
              if (activeEl) {
                activeEl.removeClass("active");
              }
              activeEl = void 0;
              activeEl = right_menu.children().first().children().filter(function() {
                if ($(this).hasClass("active")) {
                  return this;
                }
              });
              if (activeEl) {
                return activeEl.removeClass("active");
              }
            });
          } else {
            return _this.tableDisplay = $(ele);
          }
        });
        $('.periodic_table_open').bind("click", function() {
          return $(this).addClass("active");
        });
        this.restoreTableIcon = function() {
          if ($('.periodic_table_open').hasClass("active")) {
            $('.periodic_table_open').removeClass("active");
            $('.periodic_table_open').text("");
            $('.periodic_table_open').css("color", "#008FFF");
            $('.periodic_table_open').append("<span class='glyphicon glyphicon-th' style='font-size: 20px; top: 1px'></span>");
            $('.periodic_table_open').css("padding-left", "8px");
          }
          if (_this.activeEle) {
            _this.activeEle.children().first().attr("stroke", "#E8E8E8");
            _this.activeEle.children().first().attr("fill", "#D8D8D8");
            return _this.activeEle = void 0;
          }
        };
        $(window).resize(function() {
          if (container.width() !== $('#content-container').width()) {
            container.width($('#content-container').width());
            canvas.width(container.width() - 76);
            canvas.height(container.height() - 40);
            return _this.view.viewSize = new _this.Size(canvas.width(), canvas.height());
          }
        });
        this.setup(document.getElementById(canvas_id));
        this.printDoc = function() {
          var printContent, printHeight, printWidth, printWin, svg;
          svg = this.project.exportSVG();
          printContent = "        <html>        <body>        </body>        </html>";
          printWidth = canvas.width();
          printHeight = canvas.height();
          printWin = window.open('', '', 'width=' + printWidth + ',height=' + printHeight);
          printWin.document.open();
          printWin.document.write(printContent);
          printWin.document.body.appendChild(svg);
          printWin.document.close();
          printWin.focus();
          return printWin.print();
        };
        this.cipLabes = function(molecule) {
          var angle, angles, bond, ca, chiral, cipData, conBond, i, ii, j, k, l, ll, n, node, nodes, point, points, procNode, processed, sortRef2, stereoNodes, _results;
          i = 0;
          l = molecule.children.length;
          stereoNodes = [];
          _results = [];
          while (i < l) {
            if (molecule.children[i].dType && molecule.children[i].dType === "bond") {
              bond = molecule.children[i];
              if (bond.stereo && (bond.stereo === 'hashed' || bond.stereo === 'wedged')) {
                ca = {};
                ca.atom = bond.n_a.labels === void 0 || bond.n_a.labels.atom === void 0 || (bond.n_a.labels.atom.ele && bond.n_a.labels.atom.ele.symbol === "C") ? Ele["C"] : void 0;
                processed = false;
                j = 0;
                n = stereoNodes.length;
                while (j < n) {
                  procNode = stereoNodes[j];
                  if (procNode.ref === bond.n_a.ref) {
                    processed = true;
                    break;
                  }
                  j++;
                }
                if (processed || ca.atom === void 0) {
                  i++;
                  continue;
                }
                ca.cons = bond.n_a.connections.concat([bond]);
                ca.node = bond.n_a;
                stereoNodes.push(ca.node);
                nodes = [];
                ii = 0;
                ll = ca.cons.length;
                while (ii < ll) {
                  conBond = ca.cons[ii];
                  node = ca.node.ref === conBond.n_a.ref ? conBond.n_b : conBond.n_a;
                  if (node) {
                    nodes.push(node);
                  }
                  ii++;
                }
                if (this.isStereoNode(ca.node)) {
                  cipData = this.mkBranches(nodes, ca.node);
                  sortRef2 = this.priorityOrder(cipData.branches);
                  chiral = true;
                  j = 0;
                  k = sortRef2.length;
                  while (j < k) {
                    if (j > 0 && sortRef2[j - 1][0] === sortRef2[j][0]) {
                      chiral = false;
                    }
                    j++;
                  }
                  if (chiral) {
                    console.log("this IS a chiral centre");
                  } else {
                    console.log("this is NOT a chiral centre");
                  }
                  if (chiral) {
                    angles = [];
                    points = [];
                    j = 0;
                    k = sortRef2.length;
                    while (j < k) {
                      point = new Point({
                        x: nodes[sortRef2[j][1]].point.x - ca.node.point.x,
                        y: nodes[sortRef2[j][1]].point.y - ca.node.point.y
                      });
                      points.push(point);
                      if (j === 0) {
                        angles.push(0);
                      } else {
                        angle = (point.angle < 0 ? 360 + point.angle : point.angle) - (points[0].angle < 0 ? 360 + points[0].angle : points[0].angle);
                        angles.push(angle < 0 ? 360 + angle : angle);
                      }
                      j++;
                    }
                    if (nodes.length === 3) {
                      console.log("\n");
                      if (bond.stereo === "wedged") {
                        if (angles[1] < angles[2]) {
                          console.log("clockwise ( R )");
                        } else {
                          console.log("anti-clockwise ( S )");
                        }
                      } else if (angles[1] > angles[2]) {
                        console.log("clockwise ( R )");
                      } else {
                        console.log("anti-clockwise ( S )");
                      }
                    } else if (nodes.length === 4) {
                      if (nodes[sortRef2[3][1]].parentBond.stereo) {
                        console.log(nodes[sortRef2[3][1]].parentBond.stereo);
                      } else {
                        console.log("/none");
                      }
                    }
                  }
                }
              }
            }
            _results.push(i++);
          }
          return _results;
        };
        this.priorityOrder = function(branches) {
          var biggestLength, diff, j, jj, k, kk, len, sortRef1, sortRef2, str;
          biggestLength = 0;
          sortRef1 = [];
          sortRef2 = [];
          j = 0;
          k = branches.length;
          while (j < k) {
            sortRef1.push([]);
            sortRef2.push([]);
            if (j === 0) {
              biggestLength = branches[j].length;
            } else if (branches[j].length > biggestLength) {
              biggestLength = branches[j].length;
            }
            j++;
          }
          j = 0;
          k = biggestLength;
          while (j < k) {
            len = 0;
            jj = 0;
            kk = branches.length;
            while (jj < kk) {
              if (branches[jj][j]) {
                if (len === 0) {
                  len = branches[jj][j].length;
                } else if (len - branches[jj][j].length < 0) {
                  len = branches[jj][j].length;
                }
              }
              jj++;
            }
            jj = 0;
            kk = branches.length;
            while (jj < kk) {
              if (branches[jj][j]) {
                str = new String(branches[jj][j].join(""));
                diff = len - branches[jj][j].length;
                if (diff) {
                  sortRef1[jj].push(new String(str + Array(diff + 1).join(0)));
                } else {
                  sortRef1[jj].push(str);
                }
              } else {
                sortRef1[jj].push(new String(Array(len + 1).join(0)));
              }
              jj++;
            }
            j++;
          }
          j = 0;
          k = sortRef1.length;
          while (j < k) {
            sortRef1[j].push(j);
            j++;
          }
          (function() {
            var flag, i, indexes, l, sect, sortedIndx, _results;
            i = 0;
            l = biggestLength;
            sortedIndx = [];
            _results = [];
            while (i < l) {
              sortRef1.sort(function(a, b) {
                var ii, ind, ll, procA, procB, result;
                if (indexes) {
                  j = 0;
                  k = indexes.length;
                  result = 0;
                  while (j < k) {
                    procA = false;
                    procB = false;
                    ii = 0;
                    ll = indexes[j].length;
                    while (ii < ll) {
                      ind = indexes[j][ii];
                      if (a[i] === sortRef1[ind][i]) {
                        procA = true;
                      } else if (b[i] === sortRef1[ind][i]) {
                        procB = true;
                      }
                      if (procA && procB) {
                        result = parseInt(b[i].valueOf()) - parseInt(a[i].valueOf());
                        j = k - 1;
                        break;
                      }
                      ii++;
                    }
                    j++;
                  }
                  return result;
                } else {
                  return parseInt(b[i].valueOf()) - parseInt(a[i].valueOf());
                }
              });
              /*
                          j = 0
                          k = sortRef1.length
                          while j < k
                            sortRef2[j].push (sortRef1[j].slice(0, sortRef1[j].length-1)).toString()
                            sortRef2[j].push sortRef1[j][ sortRef1[j].length-1 ]
                            console.log sortRef2[j]
                            sortRef2[j] = []
                            j++
                          console.log '\n'
              */

              indexes = [];
              indexes[0] = [];
              sect = 0;
              j = 0;
              k = sortRef1.length;
              while (j < k) {
                flag = sortRef1[j][biggestLength];
                if (j > 0 && sortRef1[j][i].valueOf() === sortRef1[j - 1][i].valueOf()) {
                  indexes[sect].push(j - 1, j);
                } else if (j > 0 && sortRef1[j][i].valueOf() !== sortRef1[j - 1][i].valueOf()) {
                  if (sortedIndx.indexOf(flag) === -1) {
                    sortedIndx.push(flag);
                  }
                  sect++;
                  indexes[sect] = [];
                }
                j++;
              }
              j = 0;
              k = indexes.length;
              while (j < k) {
                indexes[j] = indexes[j].distinct();
                j++;
              }
              if (sortedIndx.length === sortRef1.length - 1) {
                break;
              }
              _results.push(i++);
            }
            return _results;
          })();
          j = 0;
          k = sortRef1.length;
          while (j < k) {
            sortRef2[j].push((sortRef1[j].slice(0, sortRef1[j].length - 1)).toString());
            sortRef2[j].push(sortRef1[j][sortRef1[j].length - 1]);
            console.log(sortRef2[j]);
            j++;
          }
          return sortRef2;
        };
        this.isStereoNode = function(node) {
          var bond, bonds, conAtom, connectedHs, counter, farNode, hashed, i, isStereo, l, wedged;
          bonds = node.connections.concat(node.parentBond);
          isStereo = false;
          wedged = 0;
          hashed = 0;
          counter = 0;
          connectedHs = 0;
          i = 0;
          l = bonds.length;
          while (i < l) {
            bond = bonds[i];
            farNode = node.ref === bond.n_a.ref ? bond.n_b : bond.n_a;
            conAtom = farNode.labels && farNode.labels.atom && farNode.labels.atom.ele ? farNode.labels.atom.ele : void 0;
            if (conAtom && conAtom.symbol === "H") {
              connectedHs++;
            }
            counter++;
            if (bond.stereo) {
              if (bond.stereo === "wedged") {
                wedged++;
              } else if (bond.stereo === "hashed") {
                hashed++;
              }
            }
            i++;
          }
          if (counter === 4) {
            if (wedged === 1 && hashed === 0) {
              isStereo = true;
            } else if (wedged === 1 && hashed === 1) {
              isStereo = true;
            } else if (wedged === 0 && hashed === 1) {
              isStereo = true;
            }
          } else if (counter === 3 && connectedHs === 0) {
            if (wedged === 1 && hashed === 0) {
              isStereo = true;
            } else if (wedged === 0 && hashed === 1) {
              isStereo = true;
            }
          }
          return isStereo;
        };
        this.mkBranches = function(rootNodes, caNode) {
          var branches, data, doubleBonds, genBranches, i, l, node, oldLevel, root, stereoCentres;
          root = [];
          branches = [];
          doubleBonds = [];
          stereoCentres = [];
          oldLevel = [];
          i = 0;
          l = rootNodes.length;
          while (i < l) {
            branches.push([]);
            doubleBonds.push([]);
            stereoCentres.push([]);
            oldLevel.push([]);
            node = rootNodes[i];
            root.push([node]);
            i++;
          }
          genBranches = function(rootLevel) {
            var H, addedNodes, atom, bond, branchLevel, cip, cons, count, db, gostCA, hasStereoCon, ii, implicitHs, j, jj, k, ll, n, nextBranch, nextLevel, nextNode, nodeProcd, parentBond, st;
            nextLevel = [];
            i = 0;
            l = rootLevel.length;
            while (i < l) {
              branchLevel = rootLevel[i];
              nextLevel[i] = [];
              nextBranch = nextLevel[i];
              addedNodes = branchLevel.concat(oldLevel[i]);
              cip = [];
              db = [];
              st = [];
              ii = 0;
              ll = branchLevel.length;
              while (ii < ll) {
                node = branchLevel[ii];
                atom = (node.labels && node.labels.atom && node.labels.atom.ele ? node.labels.atom.ele : Ele["C"]);
                if (atom.symbol !== "H") {
                  parentBond = node.parentBond;
                  hasStereoCon = false;
                  cons = 0;
                  j = 0;
                  n = node.connections.length;
                  while (j < n) {
                    bond = node.connections[j];
                    cons++;
                    if (bond.bondOrder && bond.bondOrder > 1) {
                      cons += bond.bondOrder - 1;
                    }
                    if (bond.stereo && (bond.stereo === "wedged" || bond.stereo === "hashed")) {
                      if (bond.n_a.ref = node.ref) {
                        hasStereoCon = true;
                      }
                    }
                    nextNode = node.ref === bond.n_a.ref ? bond.n_b : bond.n_a;
                    jj = 0;
                    k = addedNodes.length;
                    nodeProcd = false;
                    while (jj < k) {
                      if (nextNode.ref === addedNodes[jj].ref) {
                        nodeProcd = true;
                        break;
                      }
                      jj++;
                    }
                    if (nextNode.ref === caNode.ref) {
                      gostCA = new BondNode();
                      gostCA.labels = {};
                      gostCA.labels.atom = {};
                      gostCA.labels.atom.ele = Ele["C"];
                      nextBranch.push(gostCA);
                    } else if (nodeProcd === false) {
                      nextBranch.push(nextNode);
                    }
                    j++;
                  }
                  implicitHs = atom.valence - (cons + 1);
                  if (parentBond && parentBond.bondOrder) {
                    implicitHs -= parentBond.bondOrder - 1;
                  }
                  j = 0;
                  n = implicitHs;
                  while (j < n) {
                    H = new BondNode();
                    H.labels = {};
                    H.labels.atom = {};
                    H.labels.atom.ele = Ele["H"];
                    nextBranch.push(H);
                    j++;
                  }
                  if (parentBond) {
                    if (hasStereoCon || (node.parentBond.stereo && (node.parentBond.stereo === 'wedged' || node.parentBond.stereo === 'hashed') && node.parentBond.n_a.ref === node.ref)) {
                      st.push(node);
                    }
                    if (parentBond.bondOrder) {
                      if (parentBond.bondOrder === 2) {
                        db.push(parentBond);
                      }
                      j = 0;
                      n = parentBond.bondOrder;
                      while (j < n) {
                        cip.push(atom.atomicNumber);
                        j++;
                      }
                    } else {
                      cip.push(atom.atomicNumber);
                    }
                  } else {
                    cip.push(atom.atomicNumber);
                  }
                } else {
                  cip.push(atom.atomicNumber);
                }
                ii++;
              }
              if (cip.length) {
                cip.sort(function(a, b) {
                  return b - a;
                });
                branches[i].push(cip);
                doubleBonds[i].push(db);
                stereoCentres[i].push(st);
              }
              i++;
            }
            count = 0;
            i = 0;
            l = nextLevel.length;
            while (i < l) {
              if (nextLevel[i].length === 0) {
                count++;
              }
              i++;
            }
            if (nextLevel.length && nextLevel.length !== count) {
              oldLevel = rootLevel.concat([]);
              return genBranches(nextLevel);
            }
          };
          genBranches(root);
          return data = {
            branches: branches,
            doubleBonds: doubleBonds,
            stereoCentres: stereoCentres
          };
        };
        this.connect = function(bond1, bond2, point, b2Node) {
          var existingCons1, existingCons2, index1, index2;
          if (!bond1.n_a) {
            bond1.n_a = new BondNode(bond1.segments[0], bond1.segments[0].point, bond1);
          }
          if (!bond1.n_b) {
            bond1.n_b = new BondNode(bond1.segments[1], bond1.segments[1].point, bond1);
          }
          if (!bond2.n_a) {
            bond2.n_a = new BondNode(bond2.segments[0], bond2.segments[0].point, bond2);
          }
          if (!bond2.n_b) {
            bond2.n_b = new BondNode(bond2.segments[1], bond2.segments[1].point, bond2);
          }
          existingCons1 = bond1.n_a.connections.concat(bond1.n_b.connections);
          existingCons2 = bond2.n_a.connections.concat(bond2.n_b.connections);
          index1 = existingCons1.indexOf(bond2);
          index2 = existingCons2.indexOf(bond1);
          if (index2 !== -1 || index1 !== -1) {
            console.log("already connected");
            return false;
          } else {
            return this.reconnect(bond1, bond2, point, b2Node);
          }
        };
        this.reconnect = function(bond1, bond2, point, b2Node) {
          var dist1, dist2, i, index, l, node, node1;
          if (b2Node === void 0) {
            b2Node = bond2.n_a;
          } else {
            b2Node = bond2.n_b;
          }
          if (point.getDistance(bond1.n_a.segment.point, true) - point.getDistance(bond1.n_b.segment.point, true) < 0) {
            node = bond1.n_a;
          } else {
            node = bond1.n_b;
          }
          b2Node.ref = node.ref;
          i = 0;
          l = node.connections.length;
          while (i < l) {
            dist1 = point.getDistance(node.connections[i].n_a.segment.point, true);
            dist2 = point.getDistance(node.connections[i].n_b.segment.point, true);
            b2Node.connections.push(node.connections[i]);
            if (dist1 - dist2 < 0) {
              node1 = node.connections[i].n_a;
            } else {
              node1 = node.connections[i].n_b;
            }
            node1.connections.push(bond2);
            i++;
          }
          node.connections.push(bond2);
          index = b2Node.connections.indexOf(bond1);
          if (index === -1) {
            b2Node.connections.push(bond1);
          }
          this.checkMolecule(bond1.molecule);
          return true;
        };
        this.deleteFromNode = function(bond, node) {
          var connBond, dist1, dist2, i, l, ll, node1, _results;
          if (node.connections.length) {
            i = 0;
            l = node.connections.length;
            _results = [];
            while (i < l) {
              connBond = node.connections[i];
              dist1 = node.segment.point.getDistance(connBond.n_a.segment.point, true);
              dist2 = node.segment.point.getDistance(connBond.n_b.segment.point, true);
              if (dist1 - dist2 < 0) {
                node1 = connBond.n_a;
              } else {
                node1 = connBond.n_b;
              }
              ll = node1.connections.length - 1;
              while (ll > -1) {
                if (bond === node1.connections[ll]) {
                  node1.connections.splice(ll, 1);
                }
                ll--;
              }
              _results.push(i++);
            }
            return _results;
          }
        };
        this.deleteBond = function(bond) {
          var action, molecule, molecules;
          if (bond.n_a) {
            this.deleteFromNode(bond, bond.n_a);
          }
          if (bond.n_b) {
            this.deleteFromNode(bond, bond.n_b);
          }
          molecule = bond.molecule;
          if (bond.highlight) {
            this.deselectBond(bond);
          }
          bond.remove();
          molecules = this.checkMolecule(molecule);
          action = new DeleteBondAction(this, molecule, bond, molecules);
          return this.historyManager.addAction(action);
        };
        this.iDelete = function() {
          var hitResult, molecule;
          hitResult = _this.project.hitTest(_this.mouseLoc, _this.hitOptions);
          if (hitResult && hitResult.type === "stroke") {
            if (hitResult.item.bondType && hitResult.item.bondType === "aux") {
              return;
            }
            molecule = hitResult.item.molecule;
            _this.deleteBond(hitResult.item);
            _this.lastPoint = void 0;
            return _this.cancelDrawing = void 0;
          } else if (hitResult && hitResult.type === "fill") {
            if (hitResult.item.dType && hitResult.item.dType === "label") {
              molecule = hitResult.item.molecule;
              _this.deleteLabel(hitResult.item);
              if (molecule.children.length === 0) {
                molecule.remove();
              }
              _this.lastPoint = void 0;
              return _this.cancelDrawing = true;
            }
          }
        };
        this.bondLength = 23;
        this.getBondOptions = function(points) {
          var opts;
          opts = {
            segments: points,
            strokeColor: 'black',
            strokeWidth: 1.4,
            strokeCap: 'round',
            strokeJoin: 'round',
            selected: false
          };
          return opts;
        };
        this.setHashedOptions = function(bond) {
          return bond.style = {
            closed: false,
            dashArray: [1.5, 2.8],
            strokeWidth: 4,
            strokeCap: 'butt',
            dashOffset: 0
          };
        };
        this.setWedgedOptions = function(bond) {
          bond.style = {
            fillColor: 'black',
            strokeCap: 'butt',
            strokeWidth: 1.5
          };
          return bond.closed = true;
        };
        this.setSingleOptions = function(bond) {
          return bond.style = {
            closed: false,
            strokeWidth: 1.4,
            strokeCap: 'round'
          };
        };
        this.hitOptions = {
          segments: true,
          stroke: true,
          fill: true,
          tolerance: 5
        };
        this.altHitOptions = {
          segments: true,
          stroke: true,
          fill: true,
          tolerance: 2
        };
        this.midHitOptions = {
          segments: true,
          stroke: true,
          fill: true,
          tolerance: 0
        };
        tool = new this.Tool();
        this.redrawMultipleBonds = function(bond) {
          var dPoint, dPoint1, dx, dx1, dy, dy1, ii, ll, offSet1, offSet2, phi, theta;
          if (bond && bond.multiple) {
            ii = 0;
            ll = bond.multiple.length;
            while (ii < ll) {
              offSet1 = bond.segments[0].point;
              offSet2 = bond.segments[1].point;
              if (bond.n_a && bond.n_a.connections.length > 0) {
                if (bond.n_a.labels === void 0 || bond.n_a.labels.atom === void 0) {
                  offSet1 = bond.getPointAt(2.5);
                }
              }
              if (bond.n_b && bond.n_b.connections.length > 0) {
                if (bond.n_b.labels === void 0 || bond.n_b.labels.atom === void 0) {
                  offSet2 = bond.getPointAt(bond.length - 2);
                }
              }
              dx = offSet1.x - offSet2.x;
              dy = offSet1.y - offSet2.y;
              theta = Math.atan2(dy, dx);
              if (bond.multiple.length === 1 && bond.multiple[0].generator) {
                phi = eval(bond.multiple[0].generator);
              } else {
                phi = theta + Math.PI / 2;
                bond.multiple[0].generator = 'theta + Math.PI / 2';
              }
              if (ii === 1) {
                phi = theta - Math.PI / 2;
              }
              dx1 = Math.cos(phi) * this.bondLength / 6;
              dy1 = Math.sin(phi) * this.bondLength / 6;
              dPoint = new this.Point({
                x: offSet1.x + dx1,
                y: offSet1.y + dy1
              });
              dPoint1 = new this.Point({
                x: offSet2.x + dx1,
                y: offSet2.y + dy1
              });
              bond.multiple[ii].segments[0].point = dPoint;
              bond.multiple[ii].segments[1].point = dPoint1;
              ii++;
            }
            return true;
          } else {
            return false;
          }
        };
        this.mkDoubleBond = function(e, bond) {
          var dPoint, dPoint1, doubleBond, dx, dx1, dy, dy1, extra, nPoint, offSet1, offSet2, phi, theta;
          if (bond.bondType && bond.bondType === "aux") {
            bond = bond.mainBond;
          }
          if (bond.bondOrder === void 0 || bond.bondOrder === 1) {
            offSet1 = bond.segments[0].point;
            offSet2 = bond.segments[1].point;
            if (bond.n_a && bond.n_a.connections.length > 0) {
              if (bond.n_a.labels === void 0 || bond.n_a.labels.atom === void 0) {
                offSet1 = bond.getPointAt(2.5);
              }
            }
            if (bond.n_b && bond.n_b.connections.length > 0) {
              if (bond.n_b.labels === void 0 || bond.n_b.labels.atom === void 0) {
                offSet2 = bond.getPointAt(bond.length - 2);
              }
            }
            dx = offSet1.x - offSet2.x;
            dy = offSet1.y - offSet2.y;
            theta = Math.atan2(dy, dx);
            phi = theta + Math.PI / 2;
            dx1 = Math.cos(phi) * this.bondLength / 6;
            dy1 = Math.sin(phi) * this.bondLength / 6;
            dPoint = new this.Point({
              x: offSet1.x + dx1,
              y: offSet1.y + dy1
            });
            dPoint1 = new this.Point({
              x: offSet2.x + dx1,
              y: offSet2.y + dy1
            });
            doubleBond = new this.Path(this.getBondOptions([dPoint, dPoint1]));
            doubleBond.bondType = "aux";
            doubleBond.mainBond = bond;
            doubleBond.dType = 'bond';
            bond.molecule.addChild(doubleBond);
            bond.multiple = [];
            bond.multiple.push(doubleBond);
            bond.bondOrder = 2;
          } else if (bond.bondOrder === 2) {
            nPoint = bond.getNearestPoint(bond.multiple[0].segments[0].point);
            dx = nPoint.x - bond.multiple[0].segments[0].point.x;
            dy = nPoint.y - bond.multiple[0].segments[0].point.y;
            theta = Math.atan2(dy, dx);
            dx1 = 2 * Math.cos(theta) * this.bondLength / 6;
            dy1 = 2 * Math.sin(theta) * this.bondLength / 6;
            if (bond.multiple[0].generator && bond.multiple[0].generator[6] === "-") {
              bond.multiple[0].generator = 'theta + Math.PI / 2';
            } else {
              bond.multiple[0].generator = 'theta - Math.PI / 2';
            }
            bond.multiple[0].segments[0].point.x += dx1;
            bond.multiple[0].segments[0].point.y += dy1;
            bond.multiple[0].segments[1].point.x += dx1;
            bond.multiple[0].segments[1].point.y += dy1;
          } else if (bond.bondOrder === 3) {
            extra = bond.multiple[1];
            bond.multiple.splice(1, 1);
            extra.remove();
            bond.multiple[0].segments[0].point = dPoint;
            bond.multiple[0].segments[1].point = dPoint1;
            bond.bondOrder = 2;
          }
          return bond;
        };
        this.mkRing = function(hitResult, size) {
          var bond, dx1, dy1, initBond, initMolecule, newBonds, phi, point, _mkRing;
          newBonds = [];
          _mkRing = function(bond, size) {
            var dx, dx1, dy, dy1, i, l, lastPoint, middleHitResult, middlePoint, newBond, phi, seg1, seg2, testHitResult, theta;
            seg1 = bond.n_b ? bond.n_b.segment : bond.segments[1];
            seg2 = bond.n_a ? bond.n_a.segment : bond.segments[0];
            i = 0;
            l = 5;
            if (size) {
              l = size - 1;
            }
            while (i < l) {
              dx = seg2.point.x - seg1.point.x;
              dy = seg2.point.y - seg1.point.y;
              theta = Math.atan2(dy, dx);
              if (theta > Math.PI) {
                theta -= Math.PI;
              }
              if (theta < -1 * Math.PI) {
                theta += Math.PI;
              }
              if (size) {
                if (size === 6) {
                  phi = theta - 60 * Math.PI / 180;
                } else if (size === 5) {
                  phi = theta - 72 * Math.PI / 180;
                } else if (size === 7) {
                  phi = theta - 51.4285714 * Math.PI / 180;
                } else if (size === 3) {
                  phi = theta - 120 * Math.PI / 180;
                } else if (size === 4) {
                  phi = theta - 90 * Math.PI / 180;
                } else if (size === 8) {
                  phi = theta - 45 * Math.PI / 180;
                }
              } else {
                phi = theta - 60 * Math.PI / 180;
              }
              dx1 = Math.cos(phi) * bond.length;
              dy1 = Math.sin(phi) * bond.length;
              lastPoint = new _this.Point({
                x: seg2.point.x + dx1,
                y: seg2.point.y + dy1
              });
              middlePoint = new _this.Point({
                x: lastPoint.x + (seg2.point.x - lastPoint.x) / 2,
                y: lastPoint.y + (seg2.point.y - lastPoint.y) / 2
              });
              middleHitResult = _this.project.hitTest(middlePoint, _this.midHitOptions);
              testHitResult = _this.project.hitTest(lastPoint, _this.altHitOptions);
              if (testHitResult && testHitResult.type === "segment") {
                lastPoint = testHitResult.segment.point;
              }
              if (middleHitResult && middleHitResult.type === 'stroke') {
                newBond = middleHitResult.item;
              } else {
                newBond = new _this.Path(_this.getBondOptions([seg2.point, lastPoint]));
                newBond.dType = 'bond';
                bond.molecule.addChild(newBond);
                newBond.molecule = bond.molecule;
                _this.connect(bond, newBond, seg2.point);
                if (testHitResult && testHitResult.type === "segment") {
                  _this.connect(testHitResult.item, newBond, testHitResult.point, "alt");
                }
              }
              if (!middleHitResult) {
                newBonds.push(newBond);
              }
              bond = newBond;
              if (lastPoint.getDistance(bond.n_a.segment.point, true) - lastPoint.getDistance(bond.n_b.segment.point, true) < 0) {
                seg1 = bond.n_b.segment;
                seg2 = bond.n_a.segment;
              } else {
                seg2 = bond.n_b.segment;
                seg1 = bond.n_a.segment;
              }
              newBond = void 0;
              i++;
            }
            return newBonds;
          };
          if (hitResult && hitResult.item.dType && (hitResult.item.dType = 'bond')) {
            bond = hitResult.item;
            return _mkRing(bond, size);
          } else if (hitResult === null) {
            if (size) {
              if (size === 8 || size === 3 || size === 4) {
                phi = 0;
              }
              if (size === 5) {
                phi = 36 * Math.PI / 180;
              }
              if (size === 7) {
                phi = 25.7142857 * Math.PI / 180;
              }
              if (size === 6) {
                phi = 30 * Math.PI / 180;
              }
            } else {
              phi = 30 * Math.PI / 180;
            }
            dx1 = Math.cos(phi) * _this.bondLength;
            dy1 = Math.sin(phi) * _this.bondLength;
            point = new _this.Point({
              x: _this.mouseLoc.x + dx1,
              y: _this.mouseLoc.y - dy1
            });
            initBond = new _this.Path(_this.getBondOptions([point, _this.mouseLoc]));
            initBond.dType = 'bond';
            initMolecule = new _this.Group(initBond);
            initMolecule.children[0].molecule = initMolecule;
            newBonds.push(initBond);
            return _mkRing(initBond, size);
          }
        };
        this.mol2CanSmiles = function(data) {
          var mol, molJson,
            _this = this;
          data = data.replace(/[ \t]/g, "?");
          mol = {
            data: data
          };
          molJson = JSON.stringify(mol);
          return $.ajax({
            url: "/convMol2Smiles",
            type: "post",
            processData: false,
            contentType: 'application/json',
            dataType: "json",
            data: molJson,
            success: function(response) {
              if (response) {
                return console.log(response.smiles);
              }
            },
            error: function(err) {
              return "Error: " + err;
            }
          });
        };
        this.smiles2Mol = function(data) {
          var smi, smiJson;
          data = "C[C@H](c1ccc2c(n1)ccc1c2cccc1)C1CCCC1";
          smi = {
            data: data
          };
          smiJson = JSON.stringify(smi);
          return $.ajax({
            url: "/convSmiles2Mol",
            type: "post",
            processData: false,
            contentType: 'application/json',
            dataType: "json",
            data: smiJson,
            success: function(response) {
              var molInter;
              if (response) {
                molInter = new MOLInterpreter(_this);
                return molInter.read(response.mol);
              }
            },
            error: function(err) {
              return "Error: " + err;
            }
          });
        };
        this.addUpdateLabel = function(e, hitResult, atomLabel) {
          var action, bond, closeNode, cons, i, keys, l, label, point, rect, rectIndex, seg1, seg2;
          keys = e && e.key ? e.key.length : atomLabel !== void 0 ? 1 : void 0;
          if (atomLabel) {
            keys = 1;
          }
          if (hitResult && hitResult.type === "segment" && keys === 1) {
            bond = hitResult.item;
            if (bond.bondType === 'aux') {
              bond = bond.mainBond;
            }
            if (!atomLabel) {
              atomLabel = e.key.toUpperCase();
            }
            atomLabel = atomLabel.replace(/(^\s+|\s+$)/g, '');
            seg1 = bond.n_a ? bond.n_a.segment : bond.segments[0];
            seg2 = bond.n_b ? bond.n_b.segment : bond.segments[1];
            if (!bond.n_a.labels) {
              bond.n_a.labels = {};
            }
            if (!bond.n_b.labels) {
              bond.n_b.labels = {};
            }
            if (hitResult.segment.point.getDistance(seg1.point, true) - hitResult.segment.point.getDistance(seg2.point, true) < 0) {
              closeNode = bond.n_a;
            } else {
              closeNode = bond.n_b;
            }
            if (closeNode.labels.atom === void 0) {
              point = new _this.Point({
                x: closeNode.segment.point.x,
                y: closeNode.segment.point.y + 3.5
              });
              label = closeNode.labels.atom = new _this.PointText(point);
              label.justification = 'center';
              label.fillColor = 'black';
              label.content = atomLabel;
              label.fontSize = 14;
              if (Ele[label.content]) {
                label.ele = Ele[label.content];
              } else {
                label.ele === void 0;
              }
              rect = new _this.Rectangle({
                point: label.bounds.point,
                size: new _this.Size({
                  width: label.bounds.width + 6,
                  height: label.bounds.height
                })
              });
              rect.center.x -= 3;
              label.rect = new _this.Path.Ellipse(rect);
              label.rect.visible = false;
              label.rect.dType = 'bounds';
              label.dType = 'label';
              bond.molecule.addChild(label);
              bond.molecule.addChild(label.rect);
              label.molecule = bond.molecule;
              cons = [];
              i = 0;
              l = closeNode.connections.length;
              while (i < l) {
                cons.push(closeNode.connections[i]);
                i++;
              }
              label.connections = cons;
              label.connections.push(bond);
              _this.addLabelToNode(closeNode, label);
              _this.updateBonds(label.connections, closeNode.segment.point);
              action = new NewAtomLabelAction(_this, closeNode, label);
              return _this.historyManager.addAction(action);
            }
          } else if (hitResult && hitResult.type === "fill" && e.key.length === 1) {
            label = hitResult.item;
            label.content = label.content + e.character;
            if (Ele[label.content.substring(0, 2)]) {
              label.ele = Ele[label.content.substring(0, 2)];
            } else {
              label.ele === void 0;
            }
            rectIndex = label.molecule.children.indexOf(label.rect);
            label.molecule.children.splice(rectIndex, 1);
            label.rect.remove();
            rect = new _this.Rectangle({
              point: label.bounds.point,
              size: new _this.Size({
                width: label.bounds.width + 6,
                height: label.bounds.height
              })
            });
            rect.point.x -= 3;
            label.rect = new _this.Path.Ellipse(rect);
            label.rect.visible = false;
            label.molecule.addChild(label.rect);
            point = new _this.Point({
              x: label.point.x,
              y: label.point.y - 3.5
            });
            return _this.updateBonds(label.connections, point);
          }
        };
        tool.onKeyDown = function(e) {
          var bond, bondData, closeNode, conns, cons, exp, extra, hitResult, i, ii, j, jl, l, label, layer, ll, molInter, molString, molecule, moleculeData, molecules, multi, point, rect, rectIndex, seg1, seg2;
          if (e.key === '+') {
            if (_this.view.zoom < 5) {
              _this.view.zoom += 0.5;
            }
            return;
          }
          if (e.key === '-') {
            if (_this.view.zoom > 1) {
              _this.view.zoom -= 0.5;
            }
            return;
          }
          if (e.key === 'b') {
            i = 0;
            l = _this.molLayer.children.length;
            while (i < l) {
              molecule = _this.molLayer.children[i];
              if (molecule.children.length) {
                _this.cipLabes(molecule);
                i = l - 1;
              }
              i++;
            }
            return;
          }
          hitResult = _this.project.hitTest(_this.mouseLoc, _this.hitOptions);
          if (e.key === 'n' && hitResult === null) {
            i = 0;
            l = _this.molLayer.children.length;
            while (i < l) {
              if (_this.molLayer.children[i].type === 'group') {
                _this.checkMolecule(_this.molLayer.children[i]);
                console.log(_this.molLayer.children[i].bonds.length);
                console.log(_this.molLayer.children[i].labels.length);
                console.log(_this.molLayer.children[i].nodes.length);
                console.log(_this.molLayer.children[i]);
                console.log("\n\n");
              }
              i++;
            }
          }
          if (e.key === 'z' && hitResult === null) {
            molInter = new MOLInterpreter(_this);
            molecules = _this.molLayer.children;
            i = 0;
            l = molecules.length;
            while (i < l) {
              molecule = molecules[i];
              if (molecule.children.length) {
                molString = molInter.write(molecule);
                break;
              }
              i++;
            }
            if (molString) {
              molInter.read(molString);
            }
          }
          if (e.key === 'e' && hitResult === null) {
            exp = new Exporter(_this);
            exp.canvasToSvg();
            return;
          }
          if (e.key === 'm' && hitResult === null) {
            molInter = new MOLInterpreter(_this);
            molecules = _this.molLayer.children;
            i = 0;
            l = molecules.length;
            while (i < l) {
              molecule = molecules[i];
              if (molecule.children.length) {
                molString = molInter.write(molecule);
                break;
              }
              i++;
            }
            if (molString) {
              _this.mol2CanSmiles(molString);
            }
          }
          if (e.key === '1' && hitResult === null) {
            _this.smiles2Mol();
            return;
          }
          if (hitResult && hitResult.item) {
            if (hitResult.type === 'stroke' || hitResult.type === 'segment') {
              bond = hitResult.item;
            }
          } else {
            return;
          }
          if (e.key === 'x') {
            _this.geometry = 'E';
          }
          if (e.key === 's' && hitResult && hitResult.type === "stroke") {
            if (bond.bondType && bond.bondType === "aux") {
              bond = bond.mainBond;
            }
            if (bond.bondOrder && bond.bondOrder !== 1) {
              i = 0;
              l = bond.multiple.length;
              while (i < l) {
                extra = bond.multiple[i];
                bond.multiple.splice(0, 1);
                extra.remove();
                bond.bondOrder = 1;
                i++;
              }
            }
          }
          if (e.key === 'd') {
            _this.mkDoubleBond(e, hitResult);
          }
          if (e.key === 'w') {
            _this.mkWedgedBond(hitResult);
          }
          if (e.key === 'h' && hitResult && hitResult.type === 'stroke') {
            _this.mkHashedBond(hitResult);
          }
          if (e.key === '6' || e.key === '5' || e.key === '7' || e.key === '3' || e.key === '4' || e.key === '8') {
            _this.mkRing(hitResult, Number(e.key));
          }
          if ((e.key === 'backspace' || e.key === 'q') && _this.mouseLoc) {
            _this.iDelete();
            return;
          }
          if (e.key === 'p') {
            if (_this.targetPoint) {
              _this.deselectCloseNode(_this.targetPoint.segment);
            }
            _this.targetPoint = void 0;
            if (_this.currHitItem) {
              if (_this.currHitItem.type) {
                _this.deselectBond(_this.currHitItem);
                _this.currHitItem = void 0;
              } else {
                _this.deselectCloseNode(_this.currHitItem);
                _this.currHitItem = void 0;
              }
            }
            _this.view.draw();
            i = 0;
            l = _this.project.activeLayer.children.length;
            while (i < l) {
              console.log(_this.project.activeLayer.children[i].children.length);
              i++;
            }
            console.log(_this.project.activeLayer.children.length);
            _this.data = {};
            _this.data.molecules = [];
            i = 0;
            l = _this.project.activeLayer.children.length;
            while (i < l) {
              if (_this.project.activeLayer.children[i].type === 'group' && _this.project.activeLayer.children[i].children.length > 0) {
                molecule = _this.molLayer.children[i];
                console.log('molecule:');
                console.log(molecule);
                moleculeData = [];
                ii = 0;
                ll = molecule.children.length;
                while (ii < ll) {
                  bond = molecule.children[ii];
                  bondData = {};
                  bondData.segs = [];
                  bondData.segs[0] = {
                    x: bond.segments[0].point.x,
                    y: bond.segments[0].point.y
                  };
                  bondData.segs[1] = {
                    x: bond.segments[1].point.x,
                    y: bond.segments[1].point.y
                  };
                  if (bond.n_a) {
                    bondData.n_a = {};
                    if (bond.n_a.connections && bond.n_a.connections.length > 0) {
                      conns = [];
                      j = 0;
                      jl = bond.n_a.connections.length;
                      while (j < jl) {
                        conns.push(bond.n_a.connections[j].index);
                        j++;
                      }
                      bondData.n_a.cons = conns;
                    } else {
                      bondData.n_a.cons = [];
                    }
                  }
                  if (bond.n_b) {
                    bondData.n_b = {};
                    if (bond.n_b.connections && bond.n_b.connections.length > 0) {
                      conns = [];
                      j = 0;
                      jl = bond.n_b.connections.length;
                      while (j < jl) {
                        conns.push(bond.n_b.connections[j].index);
                        j++;
                      }
                      bondData.n_b.cons = conns;
                    } else {
                      bondData.n_b.cons = [];
                    }
                  }
                  if (bond.multiple) {
                    if (bond.multiple.length > 0) {
                      multi = [];
                      j = 0;
                      jl = bond.multiple.length;
                      while (j < jl) {
                        multi.push(bond.multiple[j].index);
                        j++;
                      }
                      bondData.multi = multi;
                    } else {
                      bondData.multi = [];
                    }
                  }
                  if (bond.bondOrder) {
                    bondData.bO = bond.bondOrder;
                  }
                  if (bond.bondType) {
                    bondData.bT = bond.bondType;
                  }
                  if (bond.generator) {
                    bondData.gen = bond.generator;
                  }
                  if (bond.dType) {
                    bondData.dT = bond.dType;
                  }
                  if (bond.mainBond) {
                    bondData.mB = bond.mainBond.index;
                  }
                  moleculeData.push(bondData);
                  ii++;
                }
              }
              if (moleculeData && moleculeData.length) {
                _this.data.molecules.push(moleculeData);
              }
              moleculeData = void 0;
              i++;
            }
            _this.dataStr = JSON.stringify(_this.data);
            console.log(_this.dataStr);
          }
          if (e.key === 'u' && _this.dataStr) {
            _this.project.clear();
            layer = new _this.Layer();
            layer.activate();
            setTimeout(function() {
              var b, data, index, jj, jjl, p1, p2, _results;
              data = JSON.parse(_this.dataStr);
              console.log(data);
              i = 0;
              l = data.molecules.length;
              _results = [];
              while (i < l) {
                molecule = data.molecules[i];
                m = new _this.Group();
                ii = 0;
                ll = molecule.length;
                while (ii < ll) {
                  if (molecule[ii].dT && molecule[ii].dT === 'bond') {
                    bond = molecule[ii];
                    p1 = new _this.Point({
                      x: bond.segs[0].x,
                      y: bond.segs[0].y
                    });
                    p2 = new _this.Point({
                      x: bond.segs[1].x,
                      y: bond.segs[1].y
                    });
                    b = new _this.Path(_this.getBondOptions([p1, p2]));
                    if (bond.bO) {
                      b.bondOrder = bond.bO;
                    }
                    if (bond.bT) {
                      b.bondType = bond.bT;
                    }
                    if (bond.gen) {
                      b.generator = bond.gen;
                    }
                    if (bond.dT) {
                      b.dType = bond.dT;
                    }
                    b.molecule = m;
                    m.addChild(b);
                  }
                  ii++;
                }
                j = 0;
                jl = m.children.length;
                while (j < jl) {
                  m.children[j];
                  if (m.children[j].dType && m.children[j].dType === 'bond') {
                    b = m.children[j];
                    bond = molecule[j];
                    if (bond.mB) {
                      b.mainBond = m.children[bond.mB];
                    }
                    if (bond.multi) {
                      b.multiple = [];
                      if (bond.multi[0]) {
                        b.multiple[0] = m.children[bond.multi[0]];
                      }
                      if (bond.multi[1]) {
                        b.multiple[1] = m.children[bond.multi[1]];
                      }
                    }
                    b.n_a = {};
                    b.n_b = {};
                    b.n_a.segment = b.segments[0];
                    b.n_a.point = b.segments[0].point;
                    b.n_b.segment = b.segments[1];
                    b.n_b.point = b.segments[1].point;
                    b.n_a.connections = [];
                    b.n_b.connections = [];
                    if (bond.n_a && bond.n_a.cons) {
                      jj = 0;
                      jjl = bond.n_a.cons.length;
                      while (jj < jjl) {
                        index = bond.n_a.cons[jj];
                        b.n_a.connections.push(m.children[index]);
                        jj++;
                      }
                    }
                    if (bond.n_b && bond.n_b.cons) {
                      jj = 0;
                      jjl = bond.n_b.cons.length;
                      while (jj < jjl) {
                        index = bond.n_b.cons[jj];
                        b.n_b.connections.push(m.children[index]);
                        jj++;
                      }
                    }
                  }
                  j++;
                }
                _results.push(i++);
              }
              return _results;
            }, 200);
          }
          if (hitResult && (hitResult.type === "segment" || hitResult.type === "fill")) {
            if (hitResult.type === "segment" && e.key.length === 1) {
              _this.addUpdateLabel(e, hitResult);
              return;
              seg1 = bond.n_a ? bond.n_a.segment : bond.segments[0];
              seg2 = bond.n_b ? bond.n_b.segment : bond.segments[1];
              if (!bond.n_a.labels) {
                bond.n_a.labels = {};
              }
              if (!bond.n_b.labels) {
                bond.n_b.labels = {};
              }
              if (hitResult.segment.point.getDistance(seg1.point, true) - hitResult.segment.point.getDistance(seg2.point, true) < 0) {
                closeNode = bond.n_a;
              } else {
                closeNode = bond.n_b;
              }
              if (closeNode.labels.atom === void 0) {
                point = new _this.Point(closeNode.segment.point.x, closeNode.segment.point.y + 3.5);
                label = closeNode.labels.atom = new _this.PointText(point);
                label.justification = 'center';
                label.fillColor = 'black';
                label.content = e.key.toUpperCase();
                label.fontSize = 13;
                if (Ele[label.content]) {
                  label.ele = Ele[label.content];
                } else {
                  label.ele === void 0;
                }
                rect = new _this.Rectangle({
                  point: label.bounds.point,
                  size: new _this.Size({
                    width: label.bounds.width + 8,
                    height: label.bounds.height
                  })
                });
                rect.point.x -= 4;
                label.rect = new _this.Path.Ellipse(rect);
                label.rect.visible = false;
                label.rect.dType = 'bounds';
                label.dType = 'label';
                bond.molecule.addChild(label);
                bond.molecule.addChild(label.rect);
                label.molecule = bond.molecule;
                cons = [];
                i = 0;
                l = closeNode.connections.length;
                while (i < l) {
                  cons.push(closeNode.connections[i]);
                  i++;
                }
                label.connections = cons;
                label.connections.push(bond);
                _this.addLabelToNode(closeNode, label);
                _this.updateBonds(label.connections, closeNode.segment.point, label.bounds.center);
              }
            } else if (hitResult.type === "fill" && e.key.length === 1) {
              label = hitResult.item;
              label.content = label.content + e.character;
              if (Ele[label.content.substring(0, 2)]) {
                label.ele = Ele[label.content.substring(0, 2)];
              } else {
                label.ele === void 0;
              }
              rectIndex = label.molecule.children.indexOf(label.rect);
              label.molecule.children.splice(rectIndex, 1);
              label.rect.remove();
              rect = new _this.Rectangle({
                point: label.bounds.point,
                size: new _this.Size({
                  width: label.bounds.width + 8,
                  height: label.bounds.height
                })
              });
              rect.point.x -= 4;
              label.rect = new _this.Path.Ellipse(rect);
              label.rect.visible = false;
              label.molecule.addChild(label.rect);
              point = new _this.Point({
                x: label.point.x,
                y: label.point.y - 3.5
              });
              _this.updateBonds(label.connections, point, point);
            }
          }
          return false;
        };
        this.addLabelToNode = function(node, atom) {
          var bond, closeNode, i, l, label;
          i = 0;
          l = node.connections.length;
          while (i < l) {
            bond = node.connections[i];
            if (!bond.n_a.labels) {
              bond.n_a.labels = {};
            }
            if (!bond.n_b.labels) {
              bond.n_b.labels = {};
            }
            if (node.point.getDistance(bond.n_a.segment.point, true) - node.point.getDistance(bond.n_b.segment.point, true) < 0) {
              closeNode = bond.n_a;
            } else {
              closeNode = bond.n_b;
            }
            if (closeNode.labels.atom) {
              label = closeNode.labels.atom;
              label.content = atom.content;
            } else {
              closeNode.labels.atom = atom;
            }
            i++;
          }
          if (atom.molecule.children.indexOf(atom) === -1) {
            atom.molecule.addChild(atom);
            atom.molecule.addChild(atom.rect);
          }
          return true;
        };
        this.deleteLabel = function(label) {
          var bond, closeNode, i, l, molecule, point;
          molecule = label.molecule;
          i = 0;
          l = label.connections.length;
          while (i < l) {
            if (label.connections[i].dType && label.connections[i].dType === 'bond') {
              bond = label.connections[i];
              if (label.point.getDistance(bond.n_a.segment.point, true) - label.point.getDistance(bond.n_b.segment.point, true) < 0) {
                closeNode = bond.n_a;
              } else {
                closeNode = bond.n_b;
              }
              closeNode.labels.atom = void 0;
            }
            i++;
          }
          point = new _this.Point(label.point.x, label.point.y - 3.5);
          label.rect.remove();
          label.remove();
          return _this.updateBonds(label.connections, point, point);
        };
        this.mkHashedBond = function(bond) {
          var dBond, i, l;
          if (bond.bondType && bond.bondType === "aux") {
            bond = bond.mainBond;
            i = 0;
            l = bond.multiple.length;
            while (i < l) {
              dBond = bond.multiple[i];
              bond.multiple.splice(i, 1);
              dBond.remove();
              i++;
            }
            bond.bondOrder = 1;
          }
          bond.stereo = 'hashed';
          return _this.setHashedOptions(bond);
        };
        this.mkWedgedBond = function(bond, wedgedBond) {
          var dBond, i, l, p1, p2, pointRef, ref1, ref2;
          if (wedgedBond) {
            bond = wedgedBond;
          }
          if (bond === void 0) {
            return;
          }
          if (bond.bondType && bond.bondType === "aux") {
            bond = bond.mainBond;
            i = 0;
            l = bond.multiple.length;
            while (i < l) {
              dBond = bond.multiple[i];
              bond.multiple.splice(i, 1);
              dBond.remove();
              i++;
            }
            bond.bondOrder = 1;
          }
          if (bond.wGen && wedgedBond === void 0) {
            ref1 = eval(bond.wGen.ref1);
            ref2 = eval(bond.wGen.ref2);
          } else if (wedgedBond) {
            ref1 = eval(bond.wGen.ref2);
            ref2 = eval(bond.wGen.ref1);
          } else {
            bond.wGen = {
              ref1: 'bond.n_b.segment',
              ref2: 'bond.n_a.segment'
            };
            ref1 = bond.n_b.segment;
            ref2 = bond.n_a.segment;
          }
          pointRef = new _this.Point({
            x: ref2.point.x - ref1.point.x,
            y: ref2.point.y - ref1.point.y
          });
          p1 = new _this.Point({
            length: _this.bondLength * 0.1,
            angle: pointRef.angle + 90
          });
          p2 = new _this.Point({
            length: _this.bondLength * 0.1,
            angle: pointRef.angle - 90
          });
          p1 = new _this.Point({
            x: p1.x + ref1.point.x,
            y: p1.y + ref1.point.y
          });
          p2 = new _this.Point({
            x: p2.x + ref1.point.x,
            y: p2.y + ref1.point.y
          });
          if (bond.segments.length === 2) {
            bond.segments[0].point = ref2.point;
            bond.insert(1, p1);
            bond.segments[2].point = ref1.point;
            bond.add(p2);
          } else {
            bond.segments[0].point = ref2.point;
            bond.segments[1].point = p1;
            bond.segments[2].point = ref1.point;
            bond.segments[3].point = p2;
          }
          if (bond.stereo === void 0 || bond.stereo !== 'wedged') {
            bond.stereo = 'wedged';
            _this.setWedgedOptions(bond);
          }
          if (wedgedBond === void 0) {
            if (bond.wGen.ref1 === 'bond.n_b.segment') {
              bond.n_a.segment = bond.segments[0];
              bond.n_b.segment = bond.segments[2];
            } else {
              bond.n_a.segment = bond.segments[2];
              bond.n_b.segment = bond.segments[0];
            }
            return bond.wGen = {
              ref1: bond.wGen.ref2,
              ref2: bond.wGen.ref1
            };
          }
        };
        this.updateBonds = function(connections, pos, newPos) {
          var bond, closeNode, farNode, farlabel, i, intPoint, ints, l, label, nodePoint, seg1, seg2, _results;
          i = 0;
          l = connections.length;
          _results = [];
          while (i < l) {
            bond = connections[i];
            seg1 = bond.n_a ? bond.n_a.segment : bond.segments[0];
            seg2 = bond.n_b ? bond.n_b.segment : bond.segments[1];
            if (pos.getDistance(seg1.point, true) - pos.getDistance(seg2.point, true) < 0) {
              closeNode = bond.n_a;
              farNode = bond.n_b;
            } else {
              closeNode = bond.n_b;
              farNode = bond.n_a;
            }
            if (closeNode.labels && closeNode.labels.atom) {
              label = closeNode.labels.atom;
              nodePoint = new _this.Point({
                x: label.point.x,
                y: label.point.y - 3.5
              });
              closeNode.point = closeNode.segment.point = nodePoint;
              if (bond.stereo && bond.stereo === 'wedged') {
                _this.mkWedgedBond('alt', bond);
              }
              ints = bond.getIntersections(closeNode.labels.atom.rect);
              if (ints.length === 1) {
                closeNode.segment.point = ints[0].point;
              }
              if (ints.length === 2) {
                intPoint = new _this.Point({
                  x: ints[0].point.x + (ints[1].point.x - ints[0].point.x) / 2,
                  y: ints[0].point.y + (ints[1].point.y - ints[0].point.y) / 2
                });
                closeNode.segment.point = intPoint;
              }
            } else if (newPos) {
              closeNode.segment.point = newPos;
              closeNode.point = newPos;
            }
            if (farNode.labels && farNode.labels.atom) {
              farlabel = farNode.labels.atom;
              nodePoint = new _this.Point({
                x: farlabel.point.x,
                y: farlabel.point.y - 3.5
              });
              farNode.point = farNode.segment.point = nodePoint;
              if (bond.stereo && bond.stereo === 'wedged') {
                _this.mkWedgedBond('alt', bond);
              }
              ints = bond.getIntersections(farNode.labels.atom.rect);
              if (ints.length === 1) {
                farNode.segment.point = ints[0].point;
              }
              if (ints.length === 2) {
                intPoint = new _this.Point({
                  x: ints[0].point.x + (ints[1].point.x - ints[0].point.x) / 2,
                  y: ints[0].point.y + (ints[1].point.y - ints[0].point.y) / 2
                });
                farNode.segment.point = intPoint;
              }
            }
            _this.redrawMultipleBonds(bond);
            if (bond.stereo && bond.stereo === 'wedged') {
              _this.mkWedgedBond('alt', bond);
            }
            _results.push(i++);
          }
          return _results;
        };
        this.importProject = function(data) {
          var dataObj, projectMap;
          dataObj = JSON.parse(data);
          this.project.clear();
          this.project.importJSON(dataObj.string);
          return projectMap = JSON.parse(dataObj.map);
        };
        this.selectBond = function(bond) {
          var length, norm;
          if (bond.bondType && (bond.bondType = "aux")) {
            return _this.selectBond(bond.mainBond);
          } else {
            length = bond.segments[0].point.getDistance(bond.segments[1].point);
            norm = new Point({
              x: bond.segments[0].point.x - bond.bounds.center.x,
              y: bond.segments[0].point.y - bond.bounds.center.y
            });
            bond.highlight = new _this.Path.Rectangle({
              point: [bond.bounds.center.x - (length - 0.1 * length) / 2, bond.bounds.center.y - 2.5],
              size: [length - 0.1 * length, 5]
            });
            bond.highlight.rotate(norm.angle);
            bond.highlight.fillColor = '#3399FF';
            return bond.highlight.sendToBack();
          }
        };
        this.deselectBond = function(bond) {
          if (bond.bondType && (bond.bondType = "aux")) {
            return _this.deselectBond(bond.mainBond);
          } else if (bond.highlight) {
            bond.highlight.remove();
            return bond.highlight = void 0;
          }
        };
        this.selectCloseNode = function(segment) {
          segment.highlight = new _this.Path.RegularPolygon({
            center: segment.point,
            sides: 4,
            radius: 5,
            fillColor: '#3399FF'
          });
          return segment.highlight.sendToBack();
        };
        this.deselectCloseNode = function(segment) {
          if (segment && segment.highlight) {
            segment.highlight.remove();
            return segment.highlight = void 0;
          }
        };
        if (mobBrowser === false) {
          tool.onMouseMove = function(e) {
            var bond, hitResult, segment;
            if (_this.targetPoint) {
              _this.deselectCloseNode(_this.targetPoint.segment);
            }
            _this.targetPoint = void 0;
            _this.mouseLoc = e.point;
            hitResult = _this.project.hitTest(e.point, _this.hitOptions);
            if (hitResult && hitResult.item.dType && hitResult.item.dType === 'bond') {
              if (_this.currHitItem) {
                if (_this.currHitItem.type) {
                  _this.deselectBond(_this.currHitItem);
                  _this.currHitItem = void 0;
                } else {
                  _this.deselectCloseNode(_this.currHitItem);
                  _this.currHitItem = void 0;
                }
              }
              if (hitResult.type === 'stroke') {
                _this.selectBond(hitResult.item);
                return _this.currHitItem = hitResult.item;
              } else if (hitResult.type === 'segment') {
                bond = hitResult.item;
                segment = hitResult.segment;
                if (bond.bondType && bond.bondType === "aux") {
                  bond = bond.mainBond;
                  if (e.point.getDistance(bond.n_a.segment.point, true) - e.point.getDistance(bond.n_b.segment.point, true) < 0) {
                    segment = bond.n_a.segment;
                  } else {
                    segment = bond.n_b.segment;
                  }
                }
                if (bond.stereo && bond.stereo === 'wedged') {
                  if (e.point.getDistance(bond.n_a.segment.point, true) - e.point.getDistance(bond.n_b.segment.point, true) < 0) {
                    segment = bond.n_a.segment;
                  } else {
                    segment = bond.n_b.segment;
                  }
                }
                _this.selectCloseNode(segment);
                return _this.currHitItem = segment;
              }
            } else if (hitResult === null) {
              if (_this.currHitItem && _this.currHitItem.type) {
                _this.deselectBond(_this.currHitItem);
                return _this.currHitItem = void 0;
              } else if (_this.currHitItem) {
                _this.deselectCloseNode(_this.currHitItem);
                return _this.currHitItem = void 0;
              }
            }
          };
        }
        tool.onMouseDown = function(e) {
          var bond, closePoint, farPoint, hitResult, seg1, seg2;
          if (e.event.which === 3) {
            e.event.preventDefault();
            e.event.stopImmediatePropagation();
            return false;
          }
          if (_this.currHitItem && _this.currHitItem.type) {
            _this.deselectBond(_this.currHitItem);
            _this.currHitItem = void 0;
          } else if (_this.currHitItem) {
            _this.deselectCloseNode(_this.currHitItem);
            _this.currHitItem = void 0;
          }
          hitResult = _this.project.hitTest(e.point, _this.hitOptions);
          if (hitResult && hitResult.type === "fill") {
            _this.downAtom = hitResult.item;
            return;
          }
          if (hitResult && hitResult.type === "segment") {
            bond = hitResult.item;
            if (bond.bondType && bond.bondType === "aux") {
              bond = bond.mainBond;
            }
            seg1 = bond.n_a ? bond.n_a.segment : bond.segments[0];
            seg2 = bond.n_b ? bond.n_b.segment : bond.segments[1];
            if (e.point.getDistance(seg1.point, true) - e.point.getDistance(seg2.point, true) < 0) {
              closePoint = seg1.point;
              farPoint = seg2.point;
              if (bond.n_a) {
                _this.closeNode = bond.n_a;
              }
            } else {
              closePoint = seg2.point;
              farPoint = seg1.point;
              if (bond.n_b) {
                _this.closeNode = bond.n_b;
              }
            }
            return _this.mDownPoint = {
              point: closePoint,
              pairPoint: farPoint,
              molecule: bond.molecule,
              bond: bond,
              hitResult: hitResult
            };
          } else if (hitResult && hitResult.type === "stroke") {
            bond = hitResult.item;
            if (bond.bondType && bond.bondType === "aux") {
              bond = bond.mainBond;
            }
            return _this.mDownPoint = {
              molecule: bond.molecule,
              bond: bond,
              hitResult: hitResult
            };
          }
        };
        this.dragLabel = function(e) {
          var pos;
          if (this.downAtom) {
            pos = new this.Point({
              x: this.downAtom.point.x,
              y: this.downAtom.point.y - 3.5
            });
            this.downAtom.point.x = e.point.x;
            this.downAtom.point.y = e.point.y + 3.5;
            this.downAtom.rect.position = this.downAtom.bounds.center;
            return this.updateBonds(this.downAtom.connections, pos, e.point);
          }
        };
        this.moveMolecule = function(e) {
          if (this.moveToCoords === void 0) {
            this.moveToCoords = {
              init: this.mDownPoint.molecule.bounds.center,
              toCoor: e.point
            };
            this.mDownPoint.molecule.translate(e.delta);
          } else {
            this.mDownPoint.molecule.translate(e.delta);
            this.moveToCoords.toCoor = this.mDownPoint.molecule.bounds.center;
          }
          return this.cancelDrawing = true;
        };
        this.rotateMolecule = function(e) {
          var child, diff, i, l, norm1, norm2;
          if (this.mDownPoint.hitResult.type === "segment") {
            norm1 = new this.Point({
              x: e.point.x - this.mDownPoint.molecule.position.x,
              y: e.point.y - this.mDownPoint.molecule.position.y
            });
            norm2 = new this.Point({
              x: this.mDownPoint.point.x - this.mDownPoint.molecule.position.x,
              y: this.mDownPoint.point.y - this.mDownPoint.molecule.position.y
            });
            diff = norm1.angle - norm2.angle;
            if (this.rotaMolecule === void 0) {
              this.rotaMolecule = {
                molecule: this.mDownPoint.molecule,
                initPoint: norm2,
                lastPoint: norm1,
                center: this.mDownPoint.molecule.position
              };
              this.mDownPoint.molecule.rotate(diff, this.rotaMolecule.center);
            } else {
              this.rotaMolecule.lastPoint = norm1;
              this.mDownPoint.molecule.rotate(diff, this.rotaMolecule.center);
            }
            i = 0;
            l = this.mDownPoint.molecule.children.length;
            while (i < l) {
              child = this.mDownPoint.molecule.children[i];
              if (child.dType && child.dType === 'label') {
                child.rotate(-diff);
              }
              i++;
            }
            return this.cancelDrawing = true;
          }
        };
        tool.onMouseDrag = function(e) {
          var closePoint, conns, hitResult, i, l;
          _this.cancelDrawing = true;
          if (_this.targetPoint) {
            _this.deselectCloseNode(_this.targetPoint.segment);
          }
          _this.tempHit = _this.targetPoint = _this.tempPath = void 0;
          if (e.modifiers.shift === true && _this.downAtom) {
            _this.dragLabel(e);
            return;
          }
          if (_this.mDownPoint) {
            hitResult = _this.project.hitTest(e.point, _this.hitOptions);
            if (e.modifiers.option === true && _this.mDownPoint.hitResult.type === "segment") {
              _this.rotateMolecule(e);
              return;
            }
            if (_this.mDownPoint.hitResult.type === "stroke") {
              _this.moveMolecule(e);
              return;
            } else if (_this.mDownPoint && _this.mDownPoint.hitResult.type === "stroke") {
              _this.cancelDrawing = true;
              return;
            }
            if (e.modifiers.shift === true) {
              if (_this.closeNode) {
                if (_this.closeNode.connections.length > 0) {
                  conns = [];
                  i = 0;
                  l = _this.closeNode.connections.length;
                  while (i < l) {
                    conns.push(_this.closeNode.connections[i]);
                    i++;
                  }
                  conns.push(_this.mDownPoint.bond);
                  _this.updateBonds(conns, _this.closeNode.segment.point, e.point);
                } else {

                }
              } else {
                _this.closeNode.segment.point = e.point;
              }
              return;
            }
            if (hitResult && hitResult.type === "segment") {
              closePoint = hitResult.segment.point;
              _this.tempPath = new _this.Path(_this.getBondOptions([_this.mDownPoint.point, closePoint]));
              _this.tempPath.molecule = _this.mDownPoint.molecule;
              _this.tempHit = {
                item: hitResult.item,
                point: closePoint
              };
              _this.tempPath.removeOnDrag();
              _this.cancelDrawing = true;
              return;
            }
            return _this.drawBond(e);
          } else {
            return _this.cancelDrawing = true;
          }
        };
        this.drawBond = function(e) {
          var dx, dx1, dy, dy1, lastPoint, multi, phi, tempHitResult, theta, theta1;
          dx = this.mDownPoint.point.x - this.mDownPoint.pairPoint.x;
          dy = this.mDownPoint.point.y - this.mDownPoint.pairPoint.y;
          theta = Math.atan2(dy, dx);
          dx1 = e.point.x - this.mDownPoint.point.x;
          dy1 = e.point.y - this.mDownPoint.point.y;
          theta1 = Math.atan2(dy1, dx1);
          if (e.modifiers.control === false) {
            multi = Math.floor(theta1 / (Math.PI / 12));
            phi = (Math.PI / 12) * multi;
          } else {
            phi = theta1;
          }
          if (theta > Math.PI) {
            theta -= Math.PI;
          }
          if (theta < -1 * Math.PI) {
            theta += Math.PI;
          }
          dx1 = Math.cos(phi) * this.bondLength;
          dy1 = Math.sin(phi) * this.bondLength;
          lastPoint = new this.Point({
            x: this.mDownPoint.point.x + dx1,
            y: this.mDownPoint.point.y + dy1
          });
          tempHitResult = this.project.hitTest(lastPoint, this.altHitOptions);
          if (tempHitResult && tempHitResult.item) {
            this.tempHit = {
              item: tempHitResult.item,
              point: lastPoint
            };
          }
          this.tempPath = new this.Path(this.getBondOptions([this.mDownPoint.point, lastPoint]));
          this.tempPath.removeOnDrag();
          return this.cancelDrawing = true;
        };
        tool.onMouseUp = function(e) {
          var action, eventPoint, hitResult;
          if (_this.cancelDrawing === void 0) {
            eventPoint = e.point;
            if (_this.targetPoint) {
              eventPoint = _this.targetPoint;
            }
            hitResult = _this.project.hitTest(eventPoint, _this.hitOptions);
            if (_this.stateManager.getCurrentState()) {
              _this.stateManager.getCurrentState().mouseUp(e, hitResult);
            } else {
              _this.doMouseUp(e, hitResult);
            }
          } else if (_this.tempPath) {
            _this.mDownPoint.molecule.addChild(_this.tempPath);
            _this.tempPath.dType = 'bond';
            _this.tempPath.molecule = _this.mDownPoint.molecule;
            _this.connect(_this.mDownPoint.bond, _this.tempPath, _this.mDownPoint.point);
            _this.redrawMultipleBonds(_this.mDownPoint.bond);
            if (_this.tempHit) {
              _this.connect(_this.tempHit.item, _this.tempPath, _this.tempHit.point, "alt");
              _this.redrawMultipleBonds(_this.tempHit.item);
            }
            if (_this.tempHit && _this.isTheParent(_this.mDownPoint.molecule, _this.tempHit.item) === false) {
              _this.mergeIn(_this.mDownPoint.molecule, _this.tempHit.item.molecule);
            }
          } else if (_this.moveToCoords) {
            action = new MoveMoleculeAction(_this, _this.mDownPoint.molecule, _this.moveToCoords.init, _this.moveToCoords.toCoor);
            _this.historyManager.addAction(action);
          } else if (_this.rotaMolecule) {
            action = new RotateMoleculeAction(_this, _this.mDownPoint.molecule, _this.rotaMolecule.initPoint, _this.rotaMolecule.lastPoint, _this.rotaMolecule.center);
            _this.historyManager.addAction(action);
          }
          return _this.rotaMolecule = _this.moveToCoords = _this.closeNode = _this.downAtom = _this.tempPath = _this.tempHit = _this.cancelDrawing = _this.mDownPoint = void 0;
        };
        this.doMouseUp = function(e, hitResult) {
          var action, angle, bond, closeNode, closePoint, conns, dx, dx1, dy, dy1, eventPoint, farNode, farPoint, farThirdPoint, i, iBond, iFarPoint, iPoint1, iPoint2, initBond, initMolecule, l, lastPoint2, molecule, newBond, phi, point, point1, point2, points, result, testHitResult, theta, thirdBond, x,
            _this = this;
          if (e.event.which === 3) {
            e.event.preventDefault();
            e.event.stopImmediatePropagation();
            return false;
          }
          if (hitResult && (hitResult.type === "segment" || hitResult.type === "fill")) {
            if (hitResult.item.dType) {
              if (hitResult.item.dType === "bond") {
                bond = hitResult.item;
              } else if (hitResult.item.dType === "label") {
                bond = hitResult.item.connections[0];
              } else {
                return;
              }
            } else {
              return;
            }
            if (bond.bondType && bond.bondType === "aux") {
              bond = bond.mainBond;
            }
            point1 = (bond.n_a ? bond.n_a.point : bond.segments[0].point);
            point2 = (bond.n_b ? bond.n_b.point : bond.segments[1].point);
            if (point2 === void 0) {
              console.log(bond.n_b);
            }
            eventPoint = hitResult.segment ? hitResult.segment.point : new this.Point(hitResult.item.point.x, hitResult.item.point.y - 3.5);
            if (eventPoint.getDistance(point1, true) - eventPoint.getDistance(point2, true) < 0) {
              closePoint = point1;
              farPoint = point2;
              if (bond.n_a) {
                closeNode = bond.n_a;
              }
              if (bond.n_b) {
                farNode = bond.n_b;
              }
            } else {
              closePoint = point2;
              farPoint = point1;
              if (bond.n_b) {
                closeNode = bond.n_b;
              }
              if (bond.n_a) {
                farNode = bond.n_a;
              }
            }
            dx = closePoint.x - farPoint.x;
            dy = closePoint.y - farPoint.y;
            theta = Math.atan2(dy, dx);
            if (theta > Math.PI) {
              theta -= Math.PI;
            }
            if (theta < -1 * Math.PI) {
              theta += Math.PI;
            }
            phi = theta + 60 * Math.PI / 180;
            dx1 = Math.cos(phi) * this.bondLength;
            dy1 = Math.sin(phi) * this.bondLength;
            this.lastPoint = new this.Point({
              x: closePoint.x + dx1,
              y: closePoint.y + dy1
            });
            if (farNode && farNode.connections.length === 1 && closeNode && closeNode.connections.length === 0) {
              phi = theta - 60 * Math.PI / 180;
              dx1 = Math.cos(phi) * this.bondLength;
              dy1 = Math.sin(phi) * this.bondLength;
              lastPoint2 = new this.Point({
                x: closePoint.x + dx1,
                y: closePoint.y + dy1
              });
              thirdBond = farNode.connections[0];
              if (farPoint.getDistance(thirdBond.segments[0].point, true) - farPoint.getDistance(thirdBond.segments[1].point, true) < 0) {
                farThirdPoint = thirdBond.segments[1].point;
              } else {
                farThirdPoint = thirdBond.segments[0].point;
              }
              if (farThirdPoint.getDistance(this.lastPoint, true) - farThirdPoint.getDistance(lastPoint2, true) < 0) {
                this.lastPoint = lastPoint2;
              }
            } else if (this.targetPoint === void 0 && closeNode && closeNode.connections.length > 0) {
              conns = [];
              i = 0;
              l = closeNode.connections.length;
              while (i < l) {
                conns.push(closeNode.connections[i]);
                i++;
              }
              conns.push(bond);
              points = [];
              i = 0;
              l = conns.length;
              while (i < l) {
                iBond = conns[i];
                iPoint1 = iBond.n_a ? iBond.n_a.segment.point : iBond.segments[0].point;
                iPoint2 = iBond.n_b ? iBond.n_b.segment.point : iBond.segments[1].point;
                if (closePoint.getDistance(iPoint1, true) - closePoint.getDistance(iPoint2, true) < 0) {
                  iFarPoint = iPoint2;
                } else {
                  iFarPoint = iPoint1;
                }
                point = new Point({
                  x: iFarPoint.x - closePoint.x,
                  y: iFarPoint.y - closePoint.y
                });
                if (point.angle < 0) {
                  point.angle = point.angle + 360;
                }
                points.push(point);
                i++;
              }
              points.sort(function(p1, p2) {
                return p1.angle - p2.angle;
              });
              result = [];
              result[0] = 0;
              i = 1;
              l = points.length;
              while (i < l) {
                x = points[i].angle - points[i - 1].angle;
                if (result[0] < x) {
                  result[0] = x;
                  result[1] = points[i - 1];
                }
                i++;
              }
              x = 360 - points[points.length - 1].angle + points[0].angle;
              if (result[0] < x) {
                result[0] = x;
                result[1] = points[points.length - 1];
              }
              angle = result[1].angle + result[0] / 2;
              if (angle > 360) {
                angle -= 360;
              }
              point = new Point({
                length: this.bondLength,
                angle: angle
              });
              this.lastPoint = new Point({
                x: point.x + closePoint.x,
                y: point.y + closePoint.y
              });
            }
            if (bond.molecule) {
              molecule = bond.molecule;
              testHitResult = this.project.hitTest(this.lastPoint, this.altHitOptions);
              if (testHitResult && testHitResult.type === "segment") {
                this.lastPoint = testHitResult.segment.point;
              }
              newBond = new this.Path(this.getBondOptions([closePoint, this.lastPoint]));
              newBond.dType = 'bond';
              newBond.molecule = molecule;
              molecule.addChild(newBond);
              this.connect(bond, newBond, eventPoint);
              if (testHitResult && testHitResult.type === "segment") {
                this.connect(testHitResult.item, newBond, testHitResult.point, "alt");
                if (this.isTheParent(newBond.molecule, testHitResult.item) === false) {
                  this.mergeIn(newBond.molecule, testHitResult.item.molecule);
                }
              }
              if (this.targetPoint) {
                this.deselectCloseNode(this.targetPoint.segment);
              }
              this.targetPoint = new Point({
                x: this.lastPoint.x,
                y: this.lastPoint.y
              });
              hitResult = this.project.hitTest(this.targetPoint, this.hitOptions);
              if (testHitResult) {
                this.targetPoint = void 0;
              } else if (hitResult && hitResult.segment) {
                this.selectCloseNode(hitResult.segment);
                this.targetPoint.segment = hitResult.segment;
              }
              this.updateBonds(newBond.n_a.connections.concat([newBond]), newBond.n_a.point);
              action = new NewBondAction(this, molecule, newBond);
              this.historyManager.addAction(action);
              newBond.bondOrder = 1;
              newBond.stereo = 'none';
              return newBond;
            }
          } else if (hitResult && hitResult.type === 'stroke') {
            if (hitResult.item && hitResult.item.dType === "bond") {
              bond = hitResult.item;
              if (bond.bondOrder < 3) {
                return this.mkDoubleBond(e, bond);
              }
            }
          } else {
            phi = 30 * Math.PI / 180;
            dx1 = Math.cos(phi) * this.bondLength;
            dy1 = Math.sin(phi) * this.bondLength;
            this.lastPoint = new this.Point({
              x: e.point.x + dx1,
              y: e.point.y - dy1
            });
            initBond = new this.Path(this.getBondOptions([e.point, this.lastPoint]));
            initBond.dType = 'bond';
            initMolecule = new this.Group(initBond);
            initMolecule.children[0].molecule = initMolecule;
            initBond.n_a = new BondNode(initBond.segments[0], initBond.segments[0].point, initBond);
            initBond.n_b = new BondNode(initBond.segments[1], initBond.segments[1].point, initBond);
            initMolecule.bonds = [initBond];
            initMolecule.labels = [];
            initMolecule.nodes = [initBond.n_a, initBond.n_b];
            this.lastPoint.molecule = initMolecule;
            action = new NewBondAction(this, initMolecule, initBond);
            this.historyManager.addAction(action);
            this.checkMolecule(initBond.molecule);
            if (this.targetPoint) {
              this.deselectCloseNode(this.targetPoint.segment);
            }
            this.targetPoint = new Point({
              x: this.lastPoint.x,
              y: this.lastPoint.y
            });
            hitResult = this.project.hitTest(this.targetPoint, this.hitOptions);
            if (hitResult && hitResult.segment) {
              this.selectCloseNode(hitResult.segment);
              this.targetPoint.segment = hitResult.segment;
            }
            initBond.bondOrder = 1;
            initBond.stereo = 'none';
            return initBond;
          }
        };
        this.isTheParent = function(group, item) {
          var i, l, result;
          if (group.children) {
            result = false;
            i = 0;
            l = group.children.length;
            while (i < l) {
              if (group.children[i].id === item.id) {
                result = true;
                i = l - 1;
              }
              i++;
            }
          }
          return result;
        };
        this.isDirectlyConnected = function(bond1, bond2) {
          var isConnectedAtNode, result;
          result = false;
          isConnectedAtNode = function(node) {
            var connected, i, l;
            connected = false;
            i = 0;
            l = node.connections.length;
            while (i < l) {
              if (node.connections[i].id === bond1.id) {
                connected = node;
                i = l - 1;
              }
              i++;
            }
            return connected;
          };
          if (bond2.n_a) {
            result = isConnectedAtNode(bond2.n_a);
          }
          if (bond2.n_b && result === false) {
            result = isConnectedAtNode(bond2.n_b);
          }
          return result;
        };
        this.mergeIn = function(molecule1, molecule2) {
          var i, l;
          i = 0;
          l = molecule2.children.length;
          while (i < l) {
            molecule2.children[i].molecule = molecule1;
            i++;
          }
          molecule1.addChildren(molecule2.children);
          molecule2.removeChildren();
          return true;
        };
        this.checkMolecule = function(molecule) {
          var bonds, labels, molecules, nodes, _checkMolecule,
            _this = this;
          molecules = [];
          labels = [];
          bonds = [];
          nodes = [];
          _checkMolecule = function(molecule) {
            var connections, i, ii, j, jl, l, ll, restArr, restMolecule, result, tempArr;
            if (molecule.children.length === 0) {
              return;
            }
            tempArr = [];
            tempArr.push(molecule.children[0]);
            if (molecule.children[0].dType === 'bond') {
              bonds.push(molecule.children[0]);
            }
            if (molecule.children[0].dType === 'label') {
              labels.push(molecule.children[0]);
            }
            if (molecule.children[0].multiple) {
              j = 0;
              jl = molecule.children[0].multiple.length;
              while (j < jl) {
                tempArr.push(molecule.children[0].multiple[j]);
                _this.redrawMultipleBonds(molecule.children[0]);
                j++;
              }
            }
            i = 0;
            l = tempArr.length;
            while (i < l) {
              if (tempArr[i].n_a) {
                connections = tempArr[i].n_a.connections.concat(tempArr[i].n_b.connections);
                if (tempArr[i].n_a.labels && tempArr[i].n_a.labels.atom) {
                  connections.push(tempArr[i].n_a.labels.atom);
                  connections.push(tempArr[i].n_a.labels.atom.rect);
                }
                if (tempArr[i].n_b.labels && tempArr[i].n_b.labels.atom) {
                  connections.push(tempArr[i].n_b.labels.atom);
                  connections.push(tempArr[i].n_b.labels.atom.rect);
                }
                ii = 0;
                ll = connections.length;
                while (ii < ll) {
                  if (tempArr.indexOf(connections[ii]) === -1) {
                    tempArr.push(connections[ii]);
                    if (connections[ii].multiple) {
                      j = 0;
                      jl = connections[ii].multiple.length;
                      while (j < jl) {
                        tempArr.push(connections[ii].multiple[j]);
                        _this.redrawMultipleBonds(connections[ii]);
                        j++;
                      }
                    }
                  }
                  ii++;
                }
                l = tempArr.length;
                if (tempArr[i].dType === 'bond' && bonds.indexOf(tempArr[i]) === -1) {
                  bonds.push(tempArr[i]);
                }
                if (nodes.length) {
                  result = {
                    n_a: false,
                    n_b: false
                  };
                  j = 0;
                  jl = nodes.length;
                  while (j < jl) {
                    if (nodes[j].ref === tempArr[i].n_a.ref) {
                      result.n_a = true;
                    }
                    if (nodes[j].ref === tempArr[i].n_b.ref) {
                      result.n_b = true;
                    }
                    j++;
                  }
                  if (result.n_a === false) {
                    nodes.push(tempArr[i].n_a);
                  }
                  if (result.n_b === false) {
                    nodes.push(tempArr[i].n_b);
                  }
                } else {
                  nodes = [tempArr[i].n_a, tempArr[i].n_b];
                }
              } else if (tempArr[i].dType === 'label') {
                labels.push(tempArr[i]);
              }
              i++;
            }
            if (tempArr.length < molecule.children.length) {
              restArr = [];
              i = 0;
              l = molecule.children.length;
              while (i < l) {
                if (tempArr.indexOf(molecule.children[i]) === -1) {
                  restArr.push(molecule.children[i]);
                }
                i++;
              }
              if (restArr.length > 0) {
                restMolecule = new _this.Group(restArr);
                _checkMolecule(restMolecule);
              }
            }
            molecule.bonds = bonds;
            molecule.labels = labels;
            if (molecule.children.length !== 1) {
              molecule.nodes = nodes;
            }
            molecule.children = tempArr;
            i = 0;
            l = molecule.children.length;
            while (i < l) {
              molecule.children[i].molecule = molecule;
              i++;
            }
            molecules.push(molecule);
            return true;
          };
          _checkMolecule(molecule);
          return molecules;
        };
        this.molLayer = this.project.activeLayer;
        this.layers = this.project.layers;
        return this;
      };
      _ = c.Canvas.prototype = paper;
      return this;
    })(ChemCanvas, ChemCanvas.pencil, ChemCanvas.items, Math, ChemCanvas.ELEMENTS, ChemCanvas.io);
    return ChemCanvas;
  })();

}).call(this);
