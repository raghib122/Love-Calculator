function calculateLovePercentage(name1, name2) {
    // Define pairs with fixed percentages
    var fixedPairs = {
        "john": {
            "jane": 90 // Example: John and Jane always have 90%
        },
        "alice": {
            "bob": 80 // Example: Alice and Bob always have 80%
        },
        "pramila": {
            "raghib": 99 // Example: Alice and Bob always have 80%
        },
        "raghib": {
            "pramila": 99 // Example: Alice and Bob always have 80%
        },
        "arish": {
            "zoya": 99 // Example: Alice and Bob always have 80%
        },
        "raghib zaman": {
            "pramila tamang": 99 // Example: Alice and Bob always have 80%
        }
        // Add more pairs as needed
    };

    // Check if the pair is in the fixedPairs list
    if (fixedPairs[name1] && fixedPairs[name1][name2]) {
        return fixedPairs[name1][name2] + "%"; // Return the fixed percentage
    }

    var loves = ["l", "o", "v", "e", "s"],
        countArray = [],
        count,
        jointNames;

    jointNames = (name1 + name2).toLowerCase();

    countArray = loves.map(function(item) {
        count = 0;
        for (var i = 0; i < jointNames.length; i += 1) {
            if (item === jointNames[i]) {
                count += 1;
            }
        }
        return count;
    });

    return love(countArray);
}

function love(array) {
    if (array.length > 2) {
        var newArray = array.map(function(item, index, array) {
            return item + array[index + 1];
        });
        var hold = [];
        newArray.forEach(function(item) {
            if (typeof item === "number" && !isNaN(item)) {
                if (item < 10) {
                    hold.push(item);
                } else if (item > 9) {
                    console.log('Splitting ' + item + " into " + item.toString()[0] + " and " + item.toString()[1]);
                    hold.push(parseInt(item.toString()[0]));
                    hold.push(parseInt(item.toString()[1]));
                }
            } else {
                console.log("Failed number check: " + item);
            }
        });
        return love(hold);
    } else {
        var lovePercentage = (array[0] * 10) + array[1]; // Calculate percentage based on counts
        return lovePercentage + "%";
    }
}

document.getElementById('submit').addEventListener('click', function(e) {
    e.preventDefault();
    var fatherName = document.getElementsByName('father')[0].value.toLowerCase();
    var motherName = document.getElementsByName('mother')[0].value.toLowerCase();

    if (fatherName && motherName) {
        var lovePercentage = calculateLovePercentage(fatherName, motherName);
        document.getElementById('result').textContent = lovePercentage;
    } else {
        document.getElementById('warning').textContent = "Please enter both Partner names.";
    }
}, false);
