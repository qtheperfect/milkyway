// all transformation rules of English word appendings.
var ruleArray=[
    "-g-n-i",
    "-g-n-i+e",
    "-g-n-i-%2-%s-%1$$;",
    "-g-n-i-y+i+e;",

    "-d-e$",
    "-d-e",
    "-d-e-%2-%s-%1$$",
    
    "-s",/////////////pl_for_a_noun,
    "-s-e-s$",
    "-s-e-c$",
    "-s-e-x$",
    "-s-e-o$",
    "-s-e-h$",
    "-s-e-i+y",
    "-s-e-v+f",

    "-s-e-v+f+e",

    "-r-e$",//__bijiaoji
    "-r-e",
    "-r-e-i+y",
    "-r-e-%2-%s-%1$$",
    "-t-s-e$",
    "-t-s-e",
    "-t-s-e-i+y",
    "-t-s-e-%2-%s-%1$$",

    "-s-r-e$", // workers->work
    "-s-r-e",
    "-s-r-e-i+y",
    "-s-r-e-%2-%2-%1$$",

    "-c-i-%2$",//prophetic -> prophet
    "-n-o-i-%2$", // invention -> invent
    "-l-a-c$", // historical->historic
    "-l-a-c$+e"// practical->practice
    , "-y-t-i-%2$" // originality->original
]

